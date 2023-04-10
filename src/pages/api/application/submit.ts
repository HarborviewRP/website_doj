import { getApplicationCollection } from "./../../../util/mongodb";
import { NextApiResponse } from "next";
import { createApplication, createChangeLog } from "src/util/database";
import { dbConnect } from "src/util/mongodb";
import { Action, Application, ChangeLog, FormType } from "src/types";
import { NextIronRequest, withAuth } from "../../../util/session";
import { isStaff } from "src/util/permission";
import { ObjectId } from "mongodb";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = req.session.get("user");

    if (!user.member) {
      return res.status(403).json({ message: 'You must be a member of the Discord before applying...' })
    }

    const applicantId = req.body.applicantId;
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000); // 14 days ago

    // Check if user has rejected or pending application in the last 14 days
    const rejectedOrPending = await (
      await getApplicationCollection()
    ).collection.findOne({
      applicantId: applicantId,
      status: { $in: [0, 2] },
      submissionDate: { $gte: twoWeeksAgo.getTime() },
    });

    if (rejectedOrPending && !isStaff(user)) {
      const timeUntilNextApplication =
        twoWeeksAgo.getTime() + 14 * 24 * 60 * 60 * 1000 - Date.now(); // in milliseconds
      const daysUntilNextApplication = Math.ceil(
        timeUntilNextApplication / (24 * 60 * 60 * 1000)
      );
      res.status(400).json({
        message: `You may not submit another application, as you have a pending or rejected application in the last 14 days.`,
      });
      return;
    }
    const appId = new ObjectId();

    const application: Application = {
      ...req.body,
      _id: appId,
    };
    try {
      const result = await createApplication(application);
      if (result.acknowledged) {

        const changeLog: ChangeLog = {
          userId: user.id,
          form: FormType.APPLICATION,
          formId: (application as any)._id,
          action: Action.CREATED,
          changes: [],
        }
        await createChangeLog(changeLog)

        res.status(200).json({
          message: "Application submitted successfully",
          application: application,
        });
      } else {
        res.status(500).json({ message: "Failed to submit the application" });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Error submitting the application",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default withAuth(handler);

import { ObjectId, WithId } from "mongodb";

export interface User {
  accent_color: string;
  avatar: string;
  banner: string;
  banner_color: string;
  discriminator: string;
  email: string;
  flags: number;
  id: string;
  isAdmin: boolean;
  isModerator: boolean;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  public_flags: number;
  token: string;
  username: string;
  nick: string;
  roles: string[];
  verified: boolean;
  access_level: ACCESS_LEVEL;
}

export interface PageProps {
  user?: User;
}

export enum ACCESS_LEVEL {
  VISITOR = 0,
  FTA = 1,
  FTO = 2,
  ADMIN = 3,
}


export interface DeathReg {
  name: string;
  dob: string;
  csn: string;
  dod: string;
  cert: string;
  inc: string;
  reverted?: boolean | undefined;
}

export type DeathRegWithId = WithId<DeathReg>;


// export interface Document {
//   caseno: number;
//   type: number; // 1 = search warrant, 2 = arrest warrant, 3 = death penalty
//   plaintiff: string;
//   defendant: string;
//   date: number;
//   plaintiff_signature: {
//     signed: boolean;
//     title: string;
//     signed_by: number;
//     signature: string;
//   };
//   signature: {
//     signed: boolean;
//     title: string;
//     signed_by: number;
//     signature: string;
//   };
// }

export enum DocumentType {
  ARREST_WARRANT = 1,
  SEARCH_WARRANT,
  DEATH_PENALTY_INTENT,
}
export interface Signature {
  signed: boolean;
  title: string;
  signed_by: number;
  signature: string;
}

export interface BaseDocument {
  caseno: number;
  type: DocumentType;
  plaintiff: string;
  defendant: string;
  date: number;
  plaintiff_signature: Signature;
  defendant_signature: Signature;
}

export interface ArrestWarrant extends BaseDocument {
  description: string;  // Brief description of the offense
  issuing_officer: {
    signature: string;
    name: string;
    title: string;
    city_and_state: string;
  };
}

export interface SearchWarrant extends BaseDocument {
  purpose: string;  // Purpose of the search
  evidence: string;  // Evidence supporting the warrant
}

export interface DeathPenaltyIntent extends BaseDocument {
  reasons: string[];  // Aggravating factors for seeking the penalty
  certifier: {
    defendant_name: string;
    date: number;
  };
  submitter: {
    signature: string;
    name: string;
    position: string;
  };
}

export type Document = ArrestWarrant | SearchWarrant | DeathPenaltyIntent;

// export type ApplicationWithId = WithId<Application>;

// export interface Application {
//   applicantId: string;
//   status: STATUS;
//   statusReason: string | undefined;
//   updatedById: string;
//   submissionDate: number;
//   lastUpdate: number;
//   sections: {
//     sectionId: string;
//     sectionText: string;
//     questions: {
//       questionId: string;
//       questionText: string;
//       responseType: string;
//       choices:
//         | [
//             {
//               choiceId: string;
//               choiceText: string;
//             }
//           ]
//         | undefined;
//       response: {
//         value: string;
//         choiceId: string | undefined;
//       };
//     }[];
//   }[];
//   notes: Note[] | [];
//   interviewId: string | undefined;
// }

// export type InterviewWithId = WithId<Interview>;

// export interface Interview {
//   _id?: ObjectId;
//   applicationId: string;
//   applicantId: string;
//   claimedById: string | undefined | null;
//   creationDate: number;
//   status: STATUS;
//   reason: string | undefined;
//   updatedById: string;
//   lastUpdate: number;
//   notes: Note[] | [];
//   recording_path: string | undefined;
// }

export enum FormType {
  INTERVIEW,
  APPLICATION,
}
export class DISCORD {
  static readonly ID = process.env.DISCORD_ID || "1120887833587109991";
  static readonly STAFF_ROLE_ID =
    process.env.ALLOWED_ROLE || "1140386383731626034";
  static readonly SUPERADMIN_ROLE = process.env.SUPERADMIN__ROLE || "1050767934018035772";
  static readonly VERIFY_ROLE = process.env.VERIFY_ROLE || "1123131546136748092";
}

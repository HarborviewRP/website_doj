import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "src/components/layout";
import NoSidebar from "src/components/no-auth-layout";
import LoginBox from "src/components/user/login";
import { User } from "src/types";
import { isStaff } from "src/util/permission";
import { developerRoute } from "src/util/redirects";
import { withSession } from "src/util/session";

interface Props {
  user?: User;
  session?: any;
}

export default function MainPage({}: Props) {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const isWarrant = true;

  return (
    <div className="bg-gray-100 p-10 font-serif flex justify-center items-center">
      <div className="min-h-screen bg-white p-10 lg:w-4/5 xl:w-2/3 2xl:w-1/2 md:w-full max-w-3xl shadow-xl rounded">
        <div className="py-4">
          <p className="text-blue-500 font-mono text-sm text-center">
            Case: 1-CV/CR-1 - Death Penalty - Published 8th of month 2023
          </p>
          
        </div>
        <div className="flex flex-row justify-center items-center">
            <h2 className="text-2xl mb-4 text-center w-2/3">UNITED STATES DISTRICT COURT DISTRICT OF SAN ANDREAS</h2>
        </div>

        <div className="flex">
          <div className="w-1/2 border-black border-t border-b border-r flex-1 mr-4">
            <div className="p-4">
              <h3>Person Or Org Name</h3>
              <p className="italic text-sm">Prosecution</p>
            </div>
            <div className="px-4 py-2 text-center">
              <p className="font-bold">-against-</p>
            </div>
            <div className="p-4">
              <h3>Person Or Org Name</h3>
              <p className="italic text-sm">Defendant</p>
            </div>
          </div>

          <div className="flex flex-col justify-center w-1/2">
            <p>Case No. #</p>
            {isWarrant && <p className="font-bold mt-2">WARRANT</p>}
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
            <h2 className="text-2xl mb-4 text-center mt-8 mb-4 w-1/2">Another Title</h2>
        </div>

        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum. Donec in efficitur leo. Aliquam
          malesuada magna eu ultrices. Vestibulum euismod nisl suscipit ligula
          volutpat, a feugiat urna maximus. Duis massa nibh, consequat in eros
          at, facilisis tincidunt sapien.
        </p>

        <p className="mt-4">
          Fusce non urna vitae augue viverra pulvinar. Phasellus a ex id ipsum
          posuere molestie. Donec ornare neque a purus ultrices tristique.
          Mauris in tellus quis lacus ullamcorper facilisis vitae sed dui. Ut
          facilisis, justo id auctor pulvinar, nisl lorem pulvinar erat, quis
          porta arcu massa non tellus.
        </p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps =
  withSession(developerRoute);

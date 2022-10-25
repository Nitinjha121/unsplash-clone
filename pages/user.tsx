import React from "react";
import User from "../components/auth/User";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

function userPage({ session }: { session: any }) {
  return <User session={session} />;
}

export default userPage;

export const getServerSideProps: GetServerSideProps = async function (context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

import { fetchPhotosData } from "../helper/photo";
import { GetServerSideProps } from "next";
import { Data } from "../types/interfaces";
import Reuse from "../components/Reuse";
import { getSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import Context from "../store/context";

export default function HomePage({
  photos,
  session,
}: {
  photos: Data[];
  session: any;
}) {
  const sessionCtx = useContext(Context);

  useEffect(() => {
    sessionCtx.getSession(session);
  });

  if (!photos) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return <Reuse photos={photos} query="" home={true} description="" title="" />;
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const session = await getSession({ req: context.req });

  const photos = await fetchPhotosData();

  return {
    props: {
      photos,
      session,
    },
  };
};

import { Fragment } from "react";
import PhotoId from "./index";
import dynamic from "next/dynamic";

const Info = dynamic(() => import("../../../components/model/Info"), {
  ssr: false,
});

function infoPage() {
  return (
    <Fragment>
      <Info />
      <PhotoId />;
    </Fragment>
  );
}

export default infoPage;

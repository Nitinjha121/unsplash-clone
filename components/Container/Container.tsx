import { Fragment, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../Header/Layout";
import MainWindow from "../model/MainWindow";
import { Parameters } from "../../types/types";
import Context from "../../store/context";
import { getRoute } from "../../helper/photo";

function Container({
  children,
  query,
  page,
}: {
  children: any;
  query: Parameters;
  page: Parameters;
}) {
  const router = useRouter();

  const loadingCtx = useContext(Context);

  const route = getRoute(router);

  useEffect(() => {
    if (route) {
      document.body.style.overflow = "hidden";
    }
  }, [route]);

  return (
    <Fragment>
      {route && (
        <MainWindow route={route} query={query} page={page} pathname="" />
      )}
      <Layout />

      {loadingCtx.isLoading && (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      )}

      {children}
    </Fragment>
  );
}

export default Container;

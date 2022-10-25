import { Fragment, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Window from "./Window";
import { useRouter } from "next/router";
import Info from "./Info";
import Close from "../svg/Close";
import { Parameters } from "../../types/types";
import ArrowIcon from "../svg/ArrowIcon";
import Context from "../../store/context";

function MainWindow({
  route,
  query,
  page,
  pathname,
}: {
  route: Parameters;
  query: Parameters;
  page: Parameters;
  pathname: string;
}) {
  const router = useRouter();
  const [infoRoute, setInfoRoute] = useState<string | undefined | string[]>();
  const [useQuery, setUseQuery] = useState<string | string[] | number>();

  const dataCtx = useContext(Context);

  let path = router.pathname;

  if (router.pathname === "/search") {
    path = `${router.pathname}?query=${useQuery}&page=${page}`;
  }

  const windowHandler = function (e: any) {
    if (
      e.target.classList.contains("shadow") ||
      e.target.classList.contains("close")
    ) {
      document.body.style.overflow = "visible";
      router.push(pathname || path, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    setInfoRoute(router.query.type);
    if (query) {
      setUseQuery(query);
    }
  }, [router.query]);

  const fullWidth = function (classname: string) {
    if (router.pathname === "/photos/[id]") {
      return classname;
    }
    if (router.pathname === "/photos/[id]/info") return classname;
  };

  const routeId = router.query.id || router.asPath.split("/")[2];

  function nextImageHandler() {
    let nextData;

    for (let i = 0; i < dataCtx.apiData!.length; i++) {
      if (dataCtx.apiData![dataCtx.apiData!.length - 1].id === routeId) {
        router.push(router.pathname, undefined, { shallow: true });
        return;
      }

      if (dataCtx.apiData![i].id === routeId) {
        nextData = dataCtx.apiData![i + 1];
        break;
      }
    }

    router.push(router.pathname, `/photos/${nextData?.id}`, { shallow: true });
  }

  function backImageHandler() {
    let prevData;

    for (let i = 0; i < dataCtx.apiData!.length; i++) {
      if (dataCtx.apiData![0].id === routeId) {
        router.push(router.pathname, undefined, { shallow: true });
        return;
      }

      if (dataCtx.apiData![i].id === routeId) {
        prevData = dataCtx.apiData![i - 1];
        break;
      }
    }

    router.push(router.pathname, `/photos/${prevData?.id}`, { shallow: true });
  }

  return (
    <Fragment>
      {infoRoute && <Info />}
      <WindowStyle
        className={`shadow ${fullWidth("fullWidth")}`}
        id="window"
        onClick={windowHandler}
      >
        <div className="close" onClick={windowHandler}>
          <Close id="close" />
        </div>
        <Window id={route} full={`${fullWidth("smallPart")}`} />

        <span onClick={backImageHandler} className="equivalent lefte">
          <ArrowIcon id="leftArrow " />
        </span>

        <span onClick={nextImageHandler} className="equivalent righte">
          <ArrowIcon id="rightArrow " />
        </span>
      </WindowStyle>
    </Fragment>
  );
}

export default MainWindow;

const WindowStyle = styled.section`
  display: flex;
  transition: all 0.5s;

  padding: 25px;
  padding-bottom: 50px;

  .leftArrow {
    fill: #fff;
  }

  .lefte {
    left: 20px;
  }

  .equivalent {
    position: fixed;
    top: 50vh;

    width: 34px;
    height: 34px;
    cursor: pointer;
    z-index: 205;
  }

  .righte {
    right: 20px;
  }

  .rightArrow {
    right: 20px;
    fill: #fff;
    transform: rotate(-180deg);
  }
  overflow-y: scroll;
  min-height: 100%;
  width: 100%;
  position: fixed;
  z-index: 6;
  justify-content: center;

  .close {
    position: fixed;
    top: 10px;
    left: 10px;
    cursor: pointer;
    fill: #fff;

    @media (max-width: 550px) {
      z-index: 13;
      position: fixed;
      top: 0px;
      left: 0px;
      width: 24px;
      height: 24px;
      fill: #000;
    }
  }

  @media (max-width: 550px) {
    padding: 0;
  }
`;

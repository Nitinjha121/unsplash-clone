import { useContext } from "react";
import styled from "styled-components";
import Context from "../../store/context";
import Eye from "../svg/Eye";
import DownArrow from "../svg/DownArrow";
import { useRouter } from "next/router";
import { Data, InfoType } from "../../types/interfaces";
import { PreInfoType } from "../../types/types";

function Info() {
  const { data } = useContext(Context);

  const router = useRouter();

  document.body.style.overflow = "hidden";

  const element = document.getElementById("window");

  if (element) element.style.overflowY = "scroll";

  if (data) {
    sessionStorage.setItem("0", JSON.stringify(data));
  }

  let infoData: InfoType | Data = PreInfoType;

  if (router.pathname === "/photos/[id]/info" && sessionStorage.getItem("0")) {
    const key = sessionStorage.getItem("0");
    infoData = JSON.parse(String(key));
  }

  const windowHandler = function (e: any) {
    if (
      e.target.classList.contains("shadow") ||
      e.target.classList.contains("smallClose")
    ) {
      router.back();
    }
  };

  if (!data && !infoData.created_at) return null;

  let dataDate: string = "";

  if (!infoData.created_at && data?.created_at) {
    dataDate = data?.created_at;
  }

  const date: string = new Date(
    infoData.created_at || dataDate
  ).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <InfoBack className="shadow" onClick={windowHandler}>
      <InfoStyle>
        <h2>Info</h2>
        <p>
          Published on{" "}
          <time title={infoData.created_at || data?.created_at}>{date}</time>
        </p>

        <PublicInfo>
          <div>
            <p>
              <Eye /> <span className="info__title">Views</span>
            </p>

            <h2>{infoData.views || data?.views}</h2>
            <p>Since Publicing</p>
          </div>
          <div>
            <p>
              <DownArrow /> <span className="info__title">Downloads</span>
            </p>
            <h2>{infoData.downloads ?? data?.downloads}</h2>
            <p>Since Publicing</p>
          </div>
        </PublicInfo>
        <hr />
        <p>Dimensions</p>
        <h4>
          {infoData.width || data?.width} X {infoData.height || data?.height}
        </h4>
      </InfoStyle>
    </InfoBack>
  );
}

export default Info;

const InfoBack = styled.section`
  /* transition: all 0.5s; */
  height: 100vh;
  width: 100%;
  display: flex;
  z-index: 14;
  position: fixed;
  justify-content: center;
  overflow-y: scroll;
  align-items: center;
`;

const InfoStyle = styled.article`
  z-index: 18;
  border-radius: 10px;
  background-color: white;
  width: min(600px, 90%);
  padding: 30px;
  position: absolute;

  h4 {
    font-weight: 400;
  }

  h2 {
    font-weight: 400;
    font-size: 21px;
    margin: 0;
  }
  p {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
  }

  hr {
    border-top-color: rgb(209, 209, 209);
    margin: 10px 0;
    border-style: solid none none;
  }
`;

const PublicInfo = styled.div`
  margin: 40px 0;
  width: 50%;
  display: flex;
  justify-content: space-between;

  .eye__icon {
    background-color: white;
    color: black;
  }

  .info__title {
    margin-left: 8px;
    color: rgba(0, 0, 0, 1);
  }
`;

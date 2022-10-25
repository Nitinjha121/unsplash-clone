import styled from "styled-components";
import InfoIcon from "../svg/InfoIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import Guard from "../svg/Guard";
import Calender from "../svg/Calender";
import { Data } from "../../types/interfaces";
import { getRoute } from "../../helper/photo";

function ModelInfo({ data }: { data: Data }) {
  const date = new Date(data?.created_at).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const router = useRouter();

  return (
    <ModelInfoStyle>
      <section>
        <div>
          <Calender />
          <p>Published On {date}</p>
        </div>
        <div>
          <Guard />
          <p>Free to use under the Unsplash License</p>
        </div>
      </section>
      <section className="info">
        <Link
          href={`${
            router.pathname === "/" ? "/" : router.pathname + "/"
          }?id=${getRoute(router)}&type=info`}
          as={`/photos/${getRoute(router)}/info`}
          shallow={true}
        >
          <a>
            <InfoIcon id="info__icon" /> Info
          </a>
        </Link>
      </section>
    </ModelInfoStyle>
  );
}

export default ModelInfo;

const ModelInfoStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info {
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  section {
    div {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }
    p {
      font-weight: 500;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      margin: 0;
      margin-left: 5px;
    }
    a {
      padding: 5px 14px;
      border-radius: 4px;
      color: rgb(118, 118, 118) !important;
      cursor: pointer;
      border: 1px solid rgba(200, 200, 200);
      :hover {
        text-decoration: none;
        color: black !important;
        border: 1px solid black;
        .info__icon {
          fill: black;
        }
      }
    }

    .info__icon {
      fill: rgb(118, 118, 118);
      margin-right: 5px;
    }
  }
`;

import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

function nav({ img, name, link }: { img: string; name: string; link: string }) {
  const [download, setDownload] = useState<string>();

  useEffect(() => {
    fetch(link)
      .then((res) => res.blob())
      .then((data) => URL.createObjectURL(data))
      .then((source) => setDownload(source));
  }, []);

  useEffect(() => {
    if (download) {
      const a = document.querySelector(".anchor")!;
      a.innerHTML = "Downloaded";
      a.classList.add("download__link");
    }
  }, [download]);

  function downloadHandler(e: any) {
    if (!download) {
      e.target.innerHTML = `<div class="wrapper-loader"><div class="customLoader"></div></div>`;
      e.target.classList.remove("download__link");
    }
  }

  return (
    <NavStyle>
      <div className="logo">
        <Image src={img} alt={name} height={50} width={50} />
        <p>
          <span>{name}</span> <small className="text-muted">@{name}</small>{" "}
        </p>
      </div>
      <ul>
        <li>
          <a
            href={download}
            className="download__link anchor"
            onClick={downloadHandler}
            rel="nofollow"
            download
          >
            Download
          </a>
        </li>
      </ul>
    </NavStyle>
  );
}

export default nav;

const NavStyle = styled.nav`
  display: flex;
  justify-content: space-between;
  position: sticky;
  padding: 8px 0px;
  top: -26px;
  background-color: white;
  z-index: 11;

  @media (max-width: 550px) {
    top: 0px;
  }

  ul {
    list-style: none;
    margin: 0;
    display: flex;
  }

  li {
    align-self: center;
  }

  .download__link,
  .wrapper-loader {
    padding: 5px 14px;
    border-radius: 4px;
    color: rgba(118, 118, 118);
    cursor: pointer;
    border: 1px solid rgba(200, 200, 200);
    position: relative;
    :hover {
      text-decoration: none;
      color: black;
      border: 1px solid black;
    }
  }

  .logo {
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    p {
      margin: 0px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
    }
    display: flex;
    align-items: center;
  }
`;

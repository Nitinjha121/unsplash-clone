import styled from "styled-components";
import SearchIcon from "../svg/SearchIcon";
import Link from "next/link";
import Logo from "../svg/Logo";
import useSearch from "./useSearch";
import { signIn } from "next-auth/client";
import { useContext } from "react";
import Context from "../../store/context";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

function Layout() {
  const { inputRef, seacrhHandler } = useSearch();

  const sessionCtx = useContext(Context);

  const [sessionSelf, loading] = useSession();

  const router = useRouter();

  const session = sessionCtx.session;

  // console.log(session, sessionSelf,loading);

  return (
    <Header>
      <div className="header__content">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <form className="header__searchContainer" onSubmit={seacrhHandler}>
          <div>
            <SearchIcon id="searchIcon" />
            <input
              ref={inputRef}
              type="text"
              className="header__search"
              placeholder="Search Photos"
            />
          </div>
        </form>

        {(session || sessionSelf) && (
          <div className="header__user">
            <Image
              width={30}
              height={30}
              className="header__userImg"
              src={session?.user.image || sessionSelf?.user?.image}
              alt={session?.user.name || sessionSelf?.user?.image}
              onClick={() => router.push("/user")}
            />
          </div>
        )}

        {!session && !sessionSelf && (
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Login
          </button>
        )}
      </div>
      <div className="header__options">
        <Link href="/photos/wallpapers">
          <a
            className={`${
              router.pathname === `/photos/wallpapers` ? "active" : ""
            }`}
          >
            Wallpapers
          </a>
        </Link>
        <Link href="/photos/nature">
          <a
            className={`${
              router.pathname === `/photos/nature` ? "active" : ""
            }`}
          >
            Nature
          </a>
        </Link>
        <Link href="/photos/people">
          <a
            className={`${
              router.pathname === `/photos/people` ? "active" : ""
            }`}
          >
            People
          </a>
        </Link>
        <Link href="/photos/architecture">
          <a
            className={`${
              router.pathname === `/photos/architecture` ? "active" : ""
            }`}
          >
            Architecture
          </a>
        </Link>
        <Link href="/photos/business">
          <a
            className={`${
              router.pathname === `/photos/business` ? "active" : ""
            }`}
          >
            Business & Work
          </a>
        </Link>
      </div>
    </Header>
  );
}

export default Layout;

const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: white;
  padding: 10px;
  z-index: 3;
  box-shadow: 0px 1px 10px;
  align-self: center;

  .active {
    display: block !important;
    color: #000 !important;
  }
  .active::after {
    content: "";
    display: block;
    height: 3px;
    width: 100%;
    margin-top: 5px;
    background-color: #111;
  }

  .header__user {
    position: relative;
    display: flex;
    align-items: center;

    .header__userImg {
      border-radius: 50%;
      height: 40px;
      width: 40px;
      cursor: pointer;
    }
  }

  .header__options {
    padding: 10px 0;
    overflow-x: scroll;
    display: flex;

    ::-webkit-scrollbar {
      display: none;
    }
    a {
      color: #767676;
      font-family: "Lato";
      margin-right: 15px;
      display: flex;
    }

    a:hover {
      color: #111;
    }
  }

  .header__content {
    display: flex;
    justify-content: space-around;

    button {
      padding: 2px 10px;
      border: none;
      background-color: white;
      cursor: pointer;
    }

    .header__searchContainer {
      width: 80%;
      position: relative;
      display: flex;
      justify-content: center;

      div {
        position: relative;
        width: min(500px, 100%);
        margin-left: 10px;
      }

      .searchIcon {
        position: absolute;
        top: 7px;
        left: 17px;
        fill: #767676;
      }

      .searchIcon:hover {
        fill: #111;
      }
    }

    .header__search {
      padding: 10px 50px;
      width: min(400px, 90%);
      border-radius: 30px;
      border: none;
      background-color: #eeeeee;
      vertical-align: middle;
      outline: none;
      :hover {
        border: rgb(45, 45, 45);
      }

      ::placeholder {
        color: #929292;
      }
    }
  }
`;

import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Image from "next/image";
import SearchIcon from "../svg/SearchIcon";
import useSearch from "../Header/useSearch";

function Search() {
  const { data, error } = useSWR(
    `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_API_KEY}&query=jungle&per_page=200`
  );

  const [color, setColor] = useState(true);

  const { inputRef, seacrhHandler } = useSearch();

  const num = Math.floor(Math.random() * data?.results.length);

  const photo = data?.results[num];

  return !photo ? (
    <div className="loader">
      <div className="lds-dual-ring"></div>
    </div>
  ) : (
    <SearchStyle className={`${color ? "bgBlack" : ""}`}>
      <Image
        src={photo.urls.regular}
        alt={photo.alt_description}
        layout="fill"
        objectFit="cover"
        className="search__bgImage"
        priority
        onLoad={() => setColor(false)}
      />
      <div className={`search__div white`}>
        <h1>Unsplash</h1>
        <p>
          The internet’s source of freely-usable images.
          <br /> Powered by creators everywhere.
        </p>
        <form className="search__input" onSubmit={seacrhHandler}>
          <div className="search__Icon">
            <SearchIcon id="" />
          </div>
          <input ref={inputRef} placeholder="Search Photos" />
        </form>
      </div>
    </SearchStyle>
  );
}

export default Search;

const SearchStyle = styled.section`
  padding: 10px;
  height: 100vh;
  width: 100%;
  object-fit: cover;
  max-height: 100vh;
  position: relative;
  display: flex;

  .search__bgImage {
    max-height: 100%;
    max-width: 100%;
    filter: brightness(50%);

    img {
      filter: brightness(50%);
    }
  }

  .search__div {
    align-self: center;
    z-index: 2;
    padding: 10%;
    width: 100%;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 30px;
    }

    input {
      padding: 18px 20px;
      outline: none;
      padding-left: 10px;
      border-bottom-right-radius: 6px;
      border-top-right-radius: 6px;
      border: none;
      font-size: 16px;
      width: 90%;
    }
  }

  .search__input {
    display: flex;

    .search__Icon {
      background-color: white;
      padding: 10px;
      border-bottom-left-radius: 6px;
      border-top-left-radius: 6px;
      display: flex;
      align-items: center;
    }

    svg {
      fill: #767676;
    }

    svg:hover {
      fill: #000;
    }
  }

  @media (max-width: 768px) {
    .search__input {
      display: none;
    }
    height: 200%;
  }
`;

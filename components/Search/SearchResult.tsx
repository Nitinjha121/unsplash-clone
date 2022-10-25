import { Fragment, useState, useEffect } from "react";
import PhotoGrid from "../Photo/PhotoGrid";
import styled from "styled-components";
import { useRouter } from "next/router";
import ArrowIcon from "../svg/ArrowIcon";
import Container from "../Container/Container";
import { ApiData, Data } from "../../types/interfaces";
import { Parameters } from "../../types/types";

function SearchResult({
  photos,
  query,
  page,
}: {
  photos: ApiData | undefined;
  query: Parameters;
  page: Parameters;
}) {
  const router = useRouter();

  const [data, setData] = useState<Data[]>();

  function prevHandler() {
    setData([]);
    if (router.query.page) {
      router.query.page = String(+router?.query?.page - 1);
      router.push(
        `/search?query=${router.query.query}&page=${router.query.page}`
      );
    }
  }

  const nextHandler = function () {
    setData([]);
    if (router.query.page) {
      router.query.page = String(+router.query.page + 1);
      router.push(
        `/search?query=${router.query.query}&page=${router.query.page}`
      );
    }
  };

  useEffect(() => {
    setData(photos?.results);
  }, [photos]);

  return (
    <Container query={query} page={page}>
      {!data?.length ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <SearchResultStyle>
          <PhotoGrid photos={data} collection={false} />

          <div className="searchResult__naviagtion">
            {page && page > 1 && (
              <button onClick={prevHandler}>
                <ArrowIcon id="" />
              </button>
            )}
            {page && photos && page < photos.total_pages && (
              <button onClick={nextHandler}>
                <ArrowIcon id="right" />
              </button>
            )}
          </div>
        </SearchResultStyle>
      )}
    </Container>
  );
}

export default SearchResult;

const SearchResultStyle = styled.section`
  padding: 10px;
  padding-top: 30px;

  .right {
    transform: rotate(-180deg);
  }

  .searchResult__naviagtion {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    margin-top: 20px;
    button {
      padding: 10px 40px;
      background-color: #eeeeee;
      color: black;
      border-radius: 15px;
      border: 1px solid #000;
      cursor: pointer;
    }
  }
`;

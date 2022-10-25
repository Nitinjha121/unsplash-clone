import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchSearchPhotos } from "../helper/photo";
import SearchResult from "../components/Search/SearchResult";
import { ApiData } from "../types/interfaces";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

function search({ photos, urlPage }: { photos: ApiData; urlPage: number }) {
  const router = useRouter();

  const [data, setData] = useState<ApiData>();
  const [query, setQuery] = useState<string | string[]>();
  const [page, setPage] = useState<string | undefined | string[]>();

  const pageRef = useRef(0);

  useEffect(() => {
    setData(photos);
    setQuery(router.query.query);
  }, [photos, router.query]);

  if (pageRef.current > urlPage || pageRef.current < urlPage) {
    setPage(router.query?.page);
    pageRef.current = urlPage;
  }

  return (
    <>
      <Head>
        <title>Unsplash | {query}</title>
        <meta name="query" content={String(query)} />
      </Head>
      <SearchResult photos={data} query={query} page={page} />
    </>
  );
}

export default search;

export const getServerSideProps: GetServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { query, page } = context?.query;

  const photos = await fetchSearchPhotos(query, page);

  return {
    props: {
      photos,
      urlPage: page,
    },
  };
};

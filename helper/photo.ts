import { Parameters } from "../types/types";
import useSWR from "swr";
import { route } from "next/dist/next-server/server/router";

export async function fetchPhotosData() {
  const photos = await (
    await fetch(
      `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_API_KEY}&per_page=20`
    )
  ).json();

  return photos;
}

export async function fetchSearchPhotos(
  query: Parameters,
  page: Parameters = "1"
) {
  try {
    const photos = await (
      await fetch(
        `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&page=${page}&per_page=20`
      )
    ).json();

    return photos;
  } catch (err) {
    return "Something went wrong";
  }
}

function regexSome(router: string) {
  for (let i = 0; i < 10; i++) {
    if (
      router &&
      router[i]?.charCodeAt(0) >= 65 &&
      router[i]?.charCodeAt(0) <= 90
    ) {
      return true;
    }

    if (router?.includes(`${i}`)) return true;
  }

  return false;
}

export function getRoute(router: any) {
  return router.query.id || regexSome(router.asPath?.split("/")[2])
    ? router.asPath.split("/")[2]
    : null;
}

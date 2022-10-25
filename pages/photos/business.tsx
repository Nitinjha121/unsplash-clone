import Reuse from "../../components/Reuse";
import { fetchSearchPhotos } from "../../helper/photo";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { ApiData } from "../../types/interfaces";

function wallpapers({ photos }: { photos: ApiData }) {
  return (
    <Reuse
      photos={photos.results}
      query="business"
      home={false}
      description="Reflecting the realities of the modern workplace in their many forms — from images of remote working and start-ups to shots of engineers and artists at work."
      title="Business & Work"
    />
  );
}

export default wallpapers;

export const getStaticProps: GetStaticProps = async function (
  context: GetStaticPropsContext
) {
  const photos = await fetchSearchPhotos("business", "1");

  return {
    props: {
      photos,
    },
    revalidate: 100,
  };
};

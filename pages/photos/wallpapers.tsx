import Reuse from "../../components/Reuse";
import { fetchSearchPhotos } from "../../helper/photo";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { ApiData } from "../../types/interfaces";

function wallpapers({ photos }: { photos: ApiData }) {
  return (
    <Reuse
      photos={photos.results}
      query="wallpapers"
      home={false}
      description="From epic drone shots to inspiring moments in nature, find free HD wallpapers worthy of your mobile and desktop screens. Finally."
      title="Wallpapers"
    />
  );
}

export default wallpapers;

export const getStaticProps: GetStaticProps = async function (
  context: GetStaticPropsContext
) {
  const photos = await fetchSearchPhotos("wallpapers", "1");

  return {
    props: {
      photos,
    },
    revalidate: 100,
  };
};

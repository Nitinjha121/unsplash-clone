import Reuse from "../../components/Reuse";
import { fetchSearchPhotos } from "../../helper/photo";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { ApiData } from "../../types/interfaces";

function wallpapers({ photos }: { photos: ApiData }) {
  return (
    <Reuse
      photos={photos.results}
      query="nature"
      home={false}
      description="Let’s celebrate the magic of Mother Earth — with images of everything our planet has to offer, from stunning seascapes, starry skies, and everything in between."
      title="Nature"
    />
  );
}

export default wallpapers;

export const getStaticProps: GetStaticProps = async function (
  context: GetStaticPropsContext
) {
  const photos = await fetchSearchPhotos("nature", "1");

  return {
    props: {
      photos,
    },
    revalidate: 100,
  };
};

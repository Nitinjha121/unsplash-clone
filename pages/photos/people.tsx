import Reuse from "../../components/Reuse";
import { fetchSearchPhotos } from "../../helper/photo";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { ApiData } from "../../types/interfaces";

function wallpapers({ photos }: { photos: ApiData }) {
  return (
    <Reuse
      photos={photos.results}
      query="people"
      home={false}
      description="Real people, captured. Photography has the power to reflect the world around us, give voice to individuals and groups within our communities — and most importantly — tell their story."
      title="People"
    />
  );
}

export default wallpapers;

export const getStaticProps: GetStaticProps = async function (
  context: GetStaticPropsContext
) {
  const photos = await fetchSearchPhotos("people", "1");

  return {
    props: {
      photos,
    },
    revalidate: 100,
  };
};

import Photo from "./Photo";
import styled from "styled-components";
import Collection from "../Collection/Collection";
import { Data, CollectionType } from "../../types/interfaces";

function PhotoGrid({
  photos,
  collection,
}: {
  photos: CollectionType[] | Data[];
  collection: boolean;
}) {
  return (
    <PhotoGridStyle>
      {photos.map(
        (photo: any, i: number) =>
          (collection && <Collection key={i} photo={photo} />) || (
            <Photo key={i} index={i} photo={photo} />
          )
      )}
    </PhotoGridStyle>
  );
}

export default PhotoGrid;

const PhotoGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
  grid-gap: 2rem;
  .rowGrid {
    height: 100%;
    grid-row: span 2;
  }
`;

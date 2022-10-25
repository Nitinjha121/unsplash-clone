import PhotoGrid from "../Photo/PhotoGrid";
import styled from "styled-components";
import { Tags, CollectionType } from "../../types/interfaces";

function Related({ data, tags }: { tags: Tags[]; data: CollectionType[] }) {
  const photos = data.map((photo) => photo.cover_photo);

  return (
    <RelatedStyle>
      {data && (
        <div>
          <p className="collection__title">Related Photos</p>
          <PhotoGrid photos={photos} collection={false} />

          <p className="collection__title">Related Collections</p>
          <PhotoGrid photos={data} collection={true} />
        </div>
      )}

      {tags.length !== 0 && (
        <div>
          <p className="collection__title">Related Tags</p>
          <div className="collection__tag__div">
            {tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag.title[0].toUpperCase() + tag.title.slice(1)}
              </span>
            ))}
          </div>
        </div>
      )}
    </RelatedStyle>
  );
}

export default Related;

const RelatedStyle = styled.section`
  background: white;
  .collection__title {
    margin-top: 100px;
    font-size: 1.3rem;
  }

  .collection__tag__div {
    height: 100%;
  }
`;

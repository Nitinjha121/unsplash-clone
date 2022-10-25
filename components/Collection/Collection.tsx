import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { CollectionType, PreviewPhoto } from "../../types/interfaces";

function Collection({ photo }: { photo: CollectionType }) {
  const img = photo.preview_photos[0];

  const image = (img: PreviewPhoto, i: number) => (
    <Image
      key={i}
      src={img.urls.regular}
      className={"img" + i}
      alt={img.id}
      width={200}
      height={200}
    />
  );

  return (
    <CollectionStyle>
      <div className="collection__img">
        {image(img, 0)}
        <div>
          {photo.preview_photos.slice(1, 3).map((img, i) => image(img, i + 1))}
        </div>
      </div>
      <h5>{photo.title}</h5>
      <div className="collection__info text-muted">
        <p>{photo.total_photos} Photos - </p>
        <p>
          Curated by
          {photo.user.first_name +
            " " +
            (photo.user.last_name ? photo.user.last_name : "")}
        </p>
      </div>
      {photo.tags.slice(0, 3).map((tag, i) => (
        <span key={i} className="tag">
          {tag.title[0].toUpperCase() + tag.title.slice(1)}
        </span>
      ))}
    </CollectionStyle>
  );
}

export default Collection;

const CollectionStyle = styled.section`
  margin-right: 10px;
  width: 100%;

  h5 {
    margin: 10px 0px;
    font-weight: bold;
  }
  .collection__img {
    display: flex;
    width: min(300px, 100%);
    grid-gap: 0.1rem;
    height: 200px;
    margin-right: 10px;

    img {
      object-fit: cover;
    }

    .img0 {
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    div {
      display: flex;
      flex: 0.5;
      flex-direction: column;
      grid-gap: 0.1rem;
    }
    .img1 {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }
    .img2 {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
  .collection__info {
    display: flex;
    p {
      margin-right: 10px;
      font-size: 14px;
    }
  }
`;

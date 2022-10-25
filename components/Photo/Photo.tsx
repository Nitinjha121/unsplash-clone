import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { Data } from "../../types/interfaces";

function Photo({ photo, index }: { photo: Data; index: number }) {
  const [blur, setBlur] = useState<boolean>(true);

  const router = useRouter();

  const path = router.pathname === "/" ? router.basePath : router.pathname;

  return (
    <Link href={`${path}/?id=${photo.id}`} as={`/photos/${photo.id}`} shallow>
      <a
        className={`${photo.width < photo.height ? "rowGrid" : ""}`}
        style={{ height: "100%" }}
      >
        <PhotoStyle>
          {blur && (
            <Image
              src={photo.urls.thumb}
              quality={1}
              className="blur"
              layout="fill"
              // sizes="(min-width:1200px) 60vw,100vw"
              priority={true}
              onLoad={() => setBlur(true)}
              decoding="async"
              sizes="16"
            />
          )}
          <Image
            className={`img ${blur && index > 9 ? "blur" : ""}`}
            src={photo.urls.regular}
            alt={photo.alt_description}
            width={50}
            height={50}
            layout="responsive"
            priority={index < 10 ? true : false}
            sizes="(min-width:1200px) 60vw,100vw"
            onLoad={() => setBlur(false)}
          />
          <PhotoHover className="hover__hidden">
            <main className="profile">
              <Image
                src={photo.user.profile_image.small}
                alt={photo.user.first_name}
                width={20}
                height={20}
                onLoad={() => setBlur(true)}
                priority
              />
              <p>
                {photo.user.first_name} {photo.user.last_name}
              </p>
            </main>
          </PhotoHover>
        </PhotoStyle>
      </a>
    </Link>
  );
}

export default Photo;

const PhotoStyle = styled.article`
  position: relative;
  height: 100%;
  overflow: hidden;

  .hover__hidden {
    display: none;
  }

  div {
    height: 100%;
  }

  img {
    transition: all 0.5s;
    object-fit: cover;
    align-self: flex-end;
    height: 100%;
    width: 100%;
  }

  .img {
    height: 100%;
    width: 100%;
  }

  :hover {
    .img {
      filter: brightness(70%);
      transform: scale(1.2);
      transition: all 0.5s;
    }
    .hover__hidden {
      display: block;
      .profile img {
        border-radius: 100%;
      }
    }
  }

  .blur {
    filter: blur(30px);
    /* background-color: rgba(255, 255, 255, 0.95); */
    transform: none;
  }

  .blur:hover {
    filter: blur(30px);
    transform: none;
  }
`;

const PhotoHover = styled.article`
  grid-gap: 2rem;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  display: flex;

  .profile {
    display: flex;
    align-items: center;
  }

  .profile img {
    border-radius: 50%;
  }

  .profile p {
    margin: 0;
    margin-left: 7px;
  }
`;

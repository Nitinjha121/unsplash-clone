import styled from "styled-components";
import { useContext, useEffect } from "react";
import Context from "../../store/context";
import Image from "next/image";
import useSWR from "swr";
import Nav from "./Nav";
import { Fragment } from "react";
import ModelInfo from "./ModelInfo";
import Related from "./Related";
import { Parameters } from "../../types/types";

function Window({ id, full }: { id: Parameters; full: string }) {
  const dataCtx = useContext(Context);

  const { data, error } = useSWR(
    `https://api.unsplash.com/photos/${id}?client_id=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const loader = (
    <div className="loader">
      <div className="lds-dual-ring"></div>
    </div>
  );

  if (data?.errors) {
    return loader;
  }

  useEffect(() => {
    dataCtx.getData(data);
  }, [data]);

  return (
    <Model className={full}>
      {!data ? (
        loader
      ) : (
        <Fragment>
          <Nav
            img={data.user.profile_image.medium}
            name={data.user.first_name + " " + (data.user.last_name ?? "")}
            link={data.urls.full}
          />

          <div className="img">
            <Image
              src={data.urls.regular}
              alt={data.alt_description}
              width={100}
              height={100}
              layout="responsive"
              priority
            />
          </div>
          <ModelInfo data={data} />
          <Related tags={data.tags} data={data.related_collections.results} />
        </Fragment>
      )}
    </Model>
  );
}

export default Window;

const Model = styled.section`
  transition: all 0.5s;
  position: absolute;
  width: 85%;
  margin-bottom: 25px;
  padding: 10px;
  padding-bottom: 25px;
  background: white;
  z-index: 10;
  min-height: 100%;
  border-radius: 5px;

  @media (max-width: 550px) {
    width: 100%;
    border-radius: 0;
    padding-top: 0;
  }

  .img {
    display: block;
    width: min(500px, 100%);
    margin: 30px auto;
    position: relative;
    height: 100%;
  }
  .img img {
    justify-self: center;
    object-fit: contain;
  }
  .tag {
    padding: 3px 12px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 10px;
    color: rgb(118, 118, 118);
    margin-right: 10px;
    background-color: #e1e1e1;
    cursor: pointer;
    :hover {
      color: rgb(17, 17, 17);
    }
  }
`;

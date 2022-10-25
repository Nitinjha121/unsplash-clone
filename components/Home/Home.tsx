import PhotoGrid from "../Photo/PhotoGrid";
import { useMemo } from "react";
import styled from "styled-components";
import Container from "../Container/Container";
import { Data } from "../../types/interfaces";
import Search from "./Search";
import All from "./All";

function Home({
  refer,
  photos,
  home,
  description,
  title,
}: {
  refer: any;
  photos: Data[];
  home: boolean;
  title: string;
  description: string;
}) {
  return (
    <Container query="" page="">
      {home && <Search />}
      {!home && <All title={title} description={description} />}
      <HomeStyle>
        {!photos ? (
          <div className="center">
            <div className="lds-dual-ring"></div>
          </div>
        ) : (
          useMemo(
            () => <PhotoGrid photos={photos} collection={false} />,
            [photos]
          )
        )}
        {photos && (
          <div ref={refer} className="center">
            <div className="lds-dual-ring"></div>
          </div>
        )}
      </HomeStyle>
    </Container>
  );
}

export default Home;

const HomeStyle = styled.section`
  padding: 5px 10px;
  padding-top: 30px;
  transition: all 0.5s;
`;

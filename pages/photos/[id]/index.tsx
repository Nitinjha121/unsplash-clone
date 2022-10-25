import { useRouter } from "next/router";
import MainWindow from "../../../components/model/MainWindow";
import styled from "styled-components";

function PhotoId() {
  const router = useRouter();

  const route = router.query.id;

  return (
    <ContainerStyle>
      <MainWindow route={route} pathname="/" page="" query="" />;
    </ContainerStyle>
  );
}

export default PhotoId;

const ContainerStyle = styled.section`
  .fullWidth {
    padding: 0px;

    .smallPart {
      width: 100%;
      border-radius: 0px;
      margin: 0px;
      padding-top: 0px;

      nav {
        top: 0px;
      }
    }
  }
`;

import styled from "styled-components";

function All({ title, description }: { title: string; description: string }) {
  return (
    <AllStyle>
      <h1>{title}</h1>
      <p>{description}</p>
    </AllStyle>
  );
}

export default All;

const AllStyle = styled.section`
  padding: 50px 10px;
  /* height: 80vh; */

  h1 {
    font-size: 2.7rem;
    font-weight: 600;
    margin-bottom: 15px;
  }
`;

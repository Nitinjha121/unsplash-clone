import React from "react";
import styled from "styled-components";
import { signOut } from "next-auth/client";
import Image from "next/image";

function User({ session }: { session: any }) {
  if (!session) return null;

  return (
    <UserStyle>
      <Image
        src={session.user.image}
        alt={session.user.name}
        quality={100}
        width={100}
        height={100}
        layout="responsive"
      />
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </UserStyle>
  );
}

export default User;

const UserStyle = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 100%;
  position: relative;

  div {
    height: 200px;
    width: 200px;
    justify-self: center;
    align-self: center;
    margin: auto;
  }

  img {
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }

  button {
    padding: 5px 20px;
    border-radius: 10px;
    border: 1px solid #fff;
    margin-top: 30px;
    cursor: pointer;
  }
`;

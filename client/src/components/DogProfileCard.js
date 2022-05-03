import React from "react";
import styled from "styled-components";
import Doggo from "../images/good-boi-2.png";

const DogContainer = styled.div`
  width: 245px;
  height: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  margin-left: 0;

  background: #ffffff;
  border: 0.327103px solid #9b9a9a;
  box-sizing: border-box;
  box-shadow: 0px 2.61682px 2.61682px rgba(0, 0, 0, 0.5);
  border-radius: 9.81308px;
`;

const DogImg = styled.img`
  padding-top: 20px;
  :height: 78px;
  border-radius: 5%;
`;

const DogName = styled.p``;

function DogCard({ imageRef, name }) {
  return (
    <DogContainer>
      <DogImg src={Doggo} />
      <DogName>{name}</DogName>
    </DogContainer>
  );
}

export default DogCard;

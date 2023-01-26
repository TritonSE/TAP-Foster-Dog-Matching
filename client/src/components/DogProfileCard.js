/**
 * Dog Card Component
 *
 *  @summary     Dog Card Component
 *  @author      Parth Patel
 *
 * A card that contains the image of a dog and its name
 *
 * props:
 *
 * imageRef - reference to image
 * name - dog name that you want displayed on card
 */

import React from "react";
import styled from "styled-components";
import doggo from "../images/good-boi.png";

const DogContainer = styled.div`
  width: 280px;
  height: 245px;
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
  cursor: pointer;
`;

const DogImg = styled.img`
  padding-top: 20px;
  width: 150px;
  border-radius: 5%;
`;

const DogName = styled.p``;

function DogCard({ imageRef, name, onClick }) {
  return (
    <DogContainer onClick={onClick}>
      <DogImg src={imageRef || doggo} />
      <DogName>{name}</DogName>
    </DogContainer>
  );
}

export default DogCard;

import React from "react";
import styled from "styled-components";
import DefaultBody from "../components/DefaultBody";
import MainContentCard from "../components/MainContentCard";
import dogImage from "../images/dog.png";

export const ExitButton = styled.a`
  color: black;
  font-size: 25px;
  text-decoration: none;
  position: absolute;
  margin-left: -9px;
  margin-top: -27px;
`;
export const TextBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius 20px;
    font-size: 25px;
    line-height: 30px;
`;
// TODO give href to exit button
function FosterMatching() {
  return (
    <DefaultBody>
      <ExitButton href="#">Exit</ExitButton>
      Progress bar to be added after Foster Application Page #33 is merged
      <br />
      Need to import nunito as well for card title
      <MainContentCard>
        <TextBox>
          Hello Shelby <br />
          <br />
          The TAP team has matched you with Skippy as your next foster!
          <br />
          <br />
          Click on step 5 to schedule your meet and greet with Skippy!
          <br />
          <br /> Best, The Animal Pad Team
        </TextBox>
        <img src={dogImage} alt="dog" />
      </MainContentCard>
    </DefaultBody>
  );
}

export default FosterMatching;

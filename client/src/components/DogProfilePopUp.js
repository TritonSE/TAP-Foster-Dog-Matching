import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DogProfileSummary from "./DogProfileSummary";
import CreateDogPopUp from "./CreateDogPopUp";
import AmbassadorContactInfo from "./AmbassadorContactInfo";
import InternalFosterNotes from "./InternalFosterNotes";

import { device } from "../utils/useResponsive";
import whiteX from "../images/whiteX.png";
import Edit from "../images/pencil.png";
import pfp from "../images/pfp.png";

const BlurBackground = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% + 50px);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  min-height: fit-content;
  max-height: 800px;
  max-width: 1357px;
  width: 100%;

  z-index: 3;
  background: #000000;
  border-radius: 35px;
  color: white;
  ${device.tablet} {
    max-height: fit-content;
  }
`;

const Close = styled.img`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 4;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: white;
  margin-top: 0;
  position: relative;
  top: 20px;

  ${device.mobile} {
    font-size: 5vw;
  }
`;

const DogProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 2vh;
  padding-bottom: calc(33px + 3vh);

  ${device.tablet} {
    flex-direction: column;
  }
`;

const LeftWrapper = styled.div`
  width: 52.5%;

  ${device.tablet} {
    width: 80%;
    margin: auto;
  }
`;

const RightWrapper = styled.div`
  width: 37.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${device.tablet} {
    width: 80%;
    margin: auto;
  }
`;

const RightTopWrapper = styled.div`
  height: 55%;
`;

const RightBottomWrapper = styled.div`
  height: 35%;
`;

// edit portion styles
const EditWrapper = styled.div`
  position: absolute;
  bottom: 1vh;
  right: 0;

  display: flex;
  align-items: center;
  min-width: 100px;
  cursor: pointer;
`;

const EditImg = styled.img`
  width: 31px;
`;
const EditText = styled.p`
  width: 31px;
  margin: 0;
  margin-left: 10px;
`;

function DogProfilePopUp({ setDogPopUp, dog }) {
  const [editDogPopUp, setEditDogPopUp] = useState(false);
  const [curDog, setCurDog] = useState(dog);

  useEffect(() => {
    // get dog again every time pop up state changes
    fetch(`http://localhost:8000/api/dogs/${dog._id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setCurDog(json.dog);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [editDogPopUp]);

  return (
    <>
      {editDogPopUp && <CreateDogPopUp setEditDogPopUp={setEditDogPopUp} dog={curDog} update />}
      <BlurBackground>
        <ContentWrapper>
          <Close src={whiteX} onClick={() => setDogPopUp(false)} />
          <Title>Dog Profile</Title>
          <DogProfileWrapper>
            <LeftWrapper>
              <DogProfileSummary dog={curDog} />
            </LeftWrapper>
            <RightWrapper>
              <RightTopWrapper>
                <AmbassadorContactInfo
                  name="Clara A."
                  profilePic={pfp}
                  phoneNumber="1234567890"
                  email="Clara5@tap.com"
                  status={false}
                />
              </RightTopWrapper>
              <RightBottomWrapper>
                <InternalFosterNotes internalNotes={curDog.internalNotes} />
              </RightBottomWrapper>
              <EditWrapper onClick={() => setEditDogPopUp(true)}>
                <EditImg src={Edit} />
                <EditText>Edit</EditText>
              </EditWrapper>
            </RightWrapper>
          </DogProfileWrapper>
        </ContentWrapper>
      </BlurBackground>
    </>
  );
}

export default DogProfilePopUp;

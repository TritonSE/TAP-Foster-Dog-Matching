/**
 * Dog Profile Pop Up
 *
 *  @summary     Dog Profile Pop Up
 *  @author      Parth Patel
 *
 * Creates a pop up with information about a dog, correlated ambassador info, and internal notes
 *
 * Used on Manage Dog Profiles page
 *
 * props:
 *    setDogPopUp [function] - setState of whether or not the component should be open
 *                             used to close the component
 *    dog [object] - initial dog object pulled from backend
 */

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
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  @media screen and (max-height: 1000px) {
    align-items: start;
    padding-bottom: 5vh;
    height: 100%;
  }
  ${device.tablet} {
    align-items: start;
    padding-bottom: 5vh;
    height: 100%;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  min-height: fit-content;
  max-width: 1357px;
  max-height: calc(100% - 50px);
  overflow-y: scroll;
  width: 100%;
  z-index: 3;
  background: #000000;
  border-radius: 35px;
  color: white;
  display: flex;
  flex-direction: column;
  ${device.tablet} {
    max-height: fit-content;
  }
`;

const Header = styled.div``;

const Close = styled.img`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 4;
  cursor: pointer;
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
  padding-bottom: 2vh;

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
  align-self: flex-end;
  margin-bottom: 1vh;

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
      });
  }, [editDogPopUp]);

  return (
    <>
      {editDogPopUp && <CreateDogPopUp setEditDogPopUp={setEditDogPopUp} dog={curDog} update />}
      <BlurBackground>
        <ContentWrapper>
          <Header>
            <Close src={whiteX} onClick={() => setDogPopUp(false)} />
            <Title>Dog Profile</Title>
          </Header>
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
            </RightWrapper>
          </DogProfileWrapper>
          <EditWrapper onClick={() => setEditDogPopUp(true)}>
            <EditImg src={Edit} />
            <EditText>Edit</EditText>
          </EditWrapper>
        </ContentWrapper>
      </BlurBackground>
    </>
  );
}

export default DogProfilePopUp;

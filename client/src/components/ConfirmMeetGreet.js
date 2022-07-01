import React from "react";
import styled from "styled-components";
import { device } from "../utils/useResponsive";
import pfp from "../images/pfp.png";
import After from "./AfterMeetAndGreet";
import StatusUpdate from "./StatusUpdate";

const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  background: #000000;
  border-radius: 35px;
  margin-bottom: 3vh;
  ${device.tablet} {
    min-height: 80vh;
    overflow-y: scroll;
  }
`;
const ComponentHeader = styled.p`
  margin: 0;
  margin-top: 1.5vh;
  color: white;

  color: #ffffff;
  text-align: center;
  font-weight: 700;
  font-size: 33px;

  color: #ffffff;
  ${device.tablet} {
    font-size: 28px;
    padding: 5px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.875vw;
  padding: 1.875vw;

  ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  border-radius: 35px;

  ${device.tablet} {
    width: 80%;
    height: fit-content;

    overflow: visible;
    margin: 5%;
    margin-top: 3%;
  }
`;

const AfterWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
  border-radius: 35px;

  ${device.tablet} {
    width: 80%;
    height: fit-content;

    overflow: visible;
    margin: 5%;
    margin-bottom: 3%;
  }
`;

const ConfirmButton = styled.button`
  background: #8dc442;
  border-radius: 10px;
  width: 216px;
  min-height: 52px;
  font-size: 22.2876px;
  margin-bottom: 3vh;
  cursor: pointer;
  align-self: center;
  border: none;
`;

function ConfirmMeetGreet() {
  const handleConfirm = () => {
    // TODO: Handle confirmation with backend
  };

  return (
    <ConfirmContainer>
      <ComponentHeader>Meet & Greet Information</ComponentHeader>
      <ContentWrapper>
        <InfoWrapper>
          <StatusUpdate
            title="Meet and Greet Info"
            ambassador="Dhanush"
            phone="123-456-7890"
            email="test@tap.com"
            date="1/1/2022"
            time="6-7:00PM"
            tapFacilityLocation="Zoom"
            image={pfp}
            meetAndGreetView
          />
        </InfoWrapper>
        <AfterWrapper>
          <After
            dogMet="Shelly"
            dogHome="Skippy"
            supplies={[
              "Lorem Ipsum dolor sit amet, consectetur adipiscing elit.",
              "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            ]}
          />
        </AfterWrapper>
      </ContentWrapper>
      <ConfirmButton onClick={handleConfirm()}>Confirm</ConfirmButton>
    </ConfirmContainer>
  );
}

export default ConfirmMeetGreet;

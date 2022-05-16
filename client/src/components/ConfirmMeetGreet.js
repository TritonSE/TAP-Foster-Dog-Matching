import React from "react";
import styled from "styled-components";
import { device } from "../utils/useResponsive";
import pfp from "../images/pfp.png";
import After from "./AfterMeetAndGreet";
import MeetInfo from "./MeetAndGreetInfo";

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
  padding: 2vh 0vh;

  ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const InfoWrapper = styled.div`
  width: 40%;
  height: 580px;

  margin: 1% 3% 1% 6%;

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
  width: 40%;
  height: 580px;
  overflow: hidden;

  margin: 1% 6% 1% 3%;

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
  }

  return (
    <ConfirmContainer>
      <ComponentHeader>Home Screen Information</ComponentHeader>
      <ContentWrapper>
        <InfoWrapper>
          <MeetInfo
            title="Meet and Greet Info"
            ambassador="Dhanush"
            phone="123-456-7890"
            email="test@tap.com"
            date="1/1/2022"
            time="6-7:00PM"
            location="Zoom"
            image={pfp}
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

import React from "react";
import styled from "styled-components";
import Meetings from "./StatusUpdate";
import { device } from "../utils/useResponsive";
import pfp from "../images/eren.png";

const ConfirmContainer = styled.div`
  max-width: 95vw;
  min-height: 65vh;
  background: #000000;
  overflow-y: scroll;
  border-radius: 35px;

  display: flex;
  flex-direction: column;
  ${device.mobile} {
    margin-top: 5vh;
    flex-direction: column;
    overflow-y: visible;
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
  line-height: 40px;

  color: #ffffff;
  ${device.mobile} {
    font-size: 20;
    padding: 5px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${device.mobile} {
    flex-direction: column;
    align-items: center;
  }
  height: 100%;
`;

const InfoWrapper = styled.div`
  width: 45%;
  height: 90%;
  margin: 2.5%;
  overflow: hidden;
  border-radius: 35px;

  ${device.mobile} {
    width: 80%;
    overflow: visible;
    margin-bottom: 4vh;
  }
`;

const AfterWrapper = styled.div`
  width: 45%;
  height: 90%;
  margin: 2.5%;
  overflow: hidden;

  border-radius: 35px;

  ${device.mobile} {
    width: 80%;
    overflow: visible;
  }
`;

// Styling for after meet and greet component
const AfterContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  background-color: white;
  border-radius: 15px;
`;

const AfterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2vw;
`;

const Title = styled.h3`
  margin: 0;
  margin: 2vh 0;
  text-align: center;
`;

const SuppliesTitle = styled.h3`
  margin: 0;
  text-align: center;
`;

const DogsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InlineInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2vh 0vh;
`;
const Text = styled.p`
  margin: 0;
`;
const CircledText = styled.div`
  border: 3px solid black;
  box-sizing: border-box;
  padding: 8px 30px;
  border-radius: 5px;
`;

const SupplyWrappper = styled.div`
  height: 20vh;
  min-height: 248px;
  padding: 10px;

  border: 3px solid #8dc442;
  box-sizing: border-box;
  border-radius: 10px;
`;

const Supplies = styled.ul``;
const Supply = styled.li``;

const ConfirmButton = styled.button`
  margin: 0 auto;
  background: #8dc442;
  border-radius: 10px;
  width: 216px;
  height: 52px;

  font-weight: 400;
  font-size: 22.2876px;
  line-height: 27px;
  color: #000000;
  margin-bottom: 2vh;
  cursor: pointer;
`;

function After(props) {
  return (
    <AfterContainer>
      <AfterContent>
        <Title>After Meet & Greet</Title>
        <DogsWrapper>
          <InlineInfo>
            <Text>Dog Met:</Text>
            <Text>{props.dogMet}</Text>
          </InlineInfo>
          <InlineInfo>
            <Text>Dog in home:</Text>
            <CircledText>{props.dogHome}</CircledText>
          </InlineInfo>
        </DogsWrapper>
        <SupplyWrappper>
          <SuppliesTitle>Supplies Checklist</SuppliesTitle>
          <Supplies>
            {props.supplies.map((supply) => (
              <Supply>{supply}</Supply>
            ))}
          </Supplies>
        </SupplyWrappper>
      </AfterContent>
    </AfterContainer>
  );
}

function ConfirmMeetGreet() {
  return (
    <ConfirmContainer>
      <ComponentHeader>Home Screen Information</ComponentHeader>
      <ContentWrapper>
        <InfoWrapper>
          <Meetings
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
      <ConfirmButton>Confirm</ConfirmButton>
    </ConfirmContainer>
  );
}

export default ConfirmMeetGreet;

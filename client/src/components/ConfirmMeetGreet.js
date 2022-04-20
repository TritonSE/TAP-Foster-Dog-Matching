import React from "react";
import styled from "styled-components";
import Meetings from "./StatusUpdate";
import { device } from "../utils/useResponsive";
import pfp from "../images/eren.png";

const ConfirmContainer = styled.div`
  max-width: 100vw;
  width: 80vw;
  height: 65vh;
  background: #000000;
  border-radius: 35px;
  overflow-y: scroll;
  ${device.mobile} {
    flex-direction: column;
    max-height: 100vh;
    overflow-y: visible;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${device.mobile} {
    flex-direction: column;
  }
`;

const InfoWrapper = styled.div`
  width: 45%;
  min-height: 100%;
  padding: 20px;
`;

const AfterWrapper = styled.div`
  width: 45%;
  min-height: 100%;
  padding: 20px;
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
  height: 100%;
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
const DogsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InlineInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Text = styled.p`
  margin: 0;
`;
const CircledText = styled.div``;

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
          <Title>Supplies Checklist</Title>
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
      <ContentWrapper>
        <InfoWrapper>
          <Meetings
            title="Interview Info"
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
            dogHome="Shelly"
            supplies={[
              "Lorem Ipsum dolor sit amet, consectetur adipiscing elit.",
              "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            ]}
          />
        </AfterWrapper>
      </ContentWrapper>
    </ConfirmContainer>
  );
}

export default ConfirmMeetGreet;

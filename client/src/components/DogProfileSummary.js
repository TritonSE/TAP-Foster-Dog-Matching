import React from "react";
import styled from "styled-components";
import Doggo from "../images/good-boi.png";
import { device } from "../utils/useResponsive";

const SummaryWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  color: black;
  background: #ffffff;
  border-radius: 15px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0px 20px;
  margin-bottom: 30px;
`;

const LeftInfoWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightInfoWrapper = styled.div`
  ${LeftInfoWrapper};
  width: 55%;
`;

const DogName = styled.h1`
  margin-bottom: 3vh;
  margin-top: 0vh;

  padding-top: 3vh;
  text-align: center;
`;

const DogPic = styled.img`
  max-width: 225px;
  max-height: 225px;
  margin-bottom: 2vh;
`;

const InlineBlob = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vh 0;
`;

const Field = styled.p`
  margin: 0;
  color: #8dc442;
  font-size: 22px;
  font-weight: 700;

  ${device.tablet} {
    font-size: max(15px, min(22px, 4vw));
  }
`;

const Value = styled.p`
  margin: 0;
  font-size: 25px;

  ${device.tablet} {
    font-size: max(15px, min(22px, 4vw));
  }
`;

const TextBlob = styled.div`
  height: 40%;
  overflow: hidden;
`;

const InlineInfo = ({ field, value }) => {
  return (
    <InlineBlob>
      <Field>{field + ":"}</Field>
      <Value>{value}</Value>
    </InlineBlob>
  );
};

function DogProfileSummary({ dog }) {
  return (
    <SummaryWrapper>
      <DogName>{dog.name}</DogName>
      <InfoWrapper>
        <LeftInfoWrapper>
          {/* TODO: change src to dog.imageUrl[0] when image hosting is figured out */}
          <DogPic src={Doggo} />
          <InlineInfo field="Age" value={dog.age + " year old"} />
          <InlineInfo field="Gender" value={dog.gender} />
          <InlineInfo field="Breed" value={dog.breed} />
          <InlineInfo field="Weight" value={dog.weight + " lbs"} />
        </LeftInfoWrapper>
        <RightInfoWrapper>
          <TextBlob>
            <Field>Vetting Information</Field>
            <Value>{dog.vettingInfo}</Value>
          </TextBlob>
          <TextBlob>
            <Field>Background Information</Field>
            <Value>{dog.backgroundInfo}</Value>
          </TextBlob>
        </RightInfoWrapper>
      </InfoWrapper>
    </SummaryWrapper>
  );
}
export default DogProfileSummary;
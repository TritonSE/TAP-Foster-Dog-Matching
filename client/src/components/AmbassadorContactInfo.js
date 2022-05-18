/**
 * Ambassador Contact Info Component
 *
 *  @summary     Ambassador Contact Info Component
 *  @author      Parth Patel
 *
 * Component that displays Ambassador info; similar to StatusUpdate, but with less information
 *
 * Used On: DogProfilePopUp.js
 *
 * Props:
 * name [string] - ambassador name
 * profilePic [reference] - reference to profile pic of ambassador
 * phoneNumber [string or number] - phone number of ambassador
 * email [string] - email of ambassador
 * matched [boolean] - whether or not ambassador is matched
 *
 */

import React from "react";
import styled from "styled-components";
import { device } from "../utils/useResponsive";

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  color: black;
  background: #ffffff;
  border-radius: 15px;
`;

const AllWrapper = styled.div`
  margin: 0px 20px;
  margin-bottom: 30px;
  font-size: 18px;

  ${device.tablet} {
    padding-bottom: 30px;
  }
`;

const Title = styled.p`
  margin: 0;
  text-align: center;
  font-weight: 700;
  font-size: 22.2876px;
  padding: 2vh 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5vw;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.sideBySide ? "row" : "column")};
  min-width: 30%;
  max-width: 70%;
`;

const Text = styled.p`
  margin: 0;
`;

const Spacer = styled.hr`
  height: 2px;
  margin: 2vh 0;
  color: #8dc442;
  background-color: #8dc442;
`;

const AmbassadorImg = styled.img`
  width: 30px;
`;

const StatusBox = styled.div`
  background: #8dc442;
  border-radius: 3px;
  width: 149px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AmbassadorContactInfo(props) {
  return (
    <ContentContainer>
      <Title>Ambassador Contact Info</Title>
      <AllWrapper>
        <Row>
          <Text>Coordinator:</Text>
          <RightColumn sideBySide>
            <AmbassadorImg src={props.profilePic} />
            <Text>{props.name}</Text>
          </RightColumn>
        </Row>
        <Spacer />
        <Row>
          <Text>Contact info:</Text>

          <RightColumn>
            <Text>{props.phoneNumber}</Text>
            <Text>{props.email}</Text>
          </RightColumn>
        </Row>
        <Spacer />
        <Row>
          <Text>Status:</Text>

          <RightColumn>
            <StatusBox>{props.matched ? "Matched" : "Not Matched"}</StatusBox>
          </RightColumn>
        </Row>
      </AllWrapper>
    </ContentContainer>
  );
}

export default AmbassadorContactInfo;

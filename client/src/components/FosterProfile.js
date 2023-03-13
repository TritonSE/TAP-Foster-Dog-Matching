import React, { useState } from "react";
import styled from "styled-components";
import SplitCardContainer from "./SplitCardContainer";

import DogCard from "./DogProfileCard";

/*
 * Component to show a Foster's profile.
 * Created by Andrew Masek
 * Used in "My Fosters" tab in coordinator view and part 6 of the foster flow
 * props: name, ambassadorName, coordinatorName
 */

const Background = styled.div`
  background-color: black;
  border-radius: 35px;
  max-width: 100%;
  text-align: center;
  padding: 5px 60px 60px 60px;
`;
const ContentBackground = styled.div`
  background-color: white;
  border-radius: 13.85px;
  width: 100%;
`;
const Title = styled.div`
  color: white;
  font-size: 33px;
  padding-bottom: 20px;
`;
const CardTitle = styled.div`
  font-size: 30px;
`;
const ContentBox = styled.div`
  max-width: 100%;
  border: 3px solid #8dc442;
  border-radius: 23.6px;
`;
const FullWidth = styled.div`
  width: 100%;
`;

function FosterProfile(props) {
  return (
    <Background>
      <Title>Foster Profile</Title>
      <ContentBackground>
        <SplitCardContainer>
          <FullWidth>
            <CardTitle>{props.name}</CardTitle>
          </FullWidth>
          <FullWidth>
            <CardTitle>Current</CardTitle>
            <p>
              {props.ambassadorName ? "Ambassador: " + props.ambassadorName + " " : ""}
              {props.coordinatorName ? "Coordinator: " + props.coordinatorName : ""}
            </p>
            {props.fosterHistory && (
              <ContentBox>
                <CardTitle>Foster History:</CardTitle>
                <SplitCardContainer style={{ maxWidth: "100px !important" }}>
                  {props.fosterHistory.map((foster) => (
                    <DogCard imageRef={foster.imageRef} name={foster.name} />
                  ))}
                </SplitCardContainer>
              </ContentBox>
            )}
          </FullWidth>
        </SplitCardContainer>
      </ContentBackground>
    </Background>
  );
}

export default FosterProfile;

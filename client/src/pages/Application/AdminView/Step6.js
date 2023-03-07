/**
 * Application (Admin View) Step 6
 */

import React from "react";
import styled from "styled-components";
import StatusUpdate from "../../../components/StatusUpdate";
import Meetings from "../../../components/Meeting";
import DogProfileSummary from "../../../components/DogProfileSummary";
import FosterProfile from "../../../components/FosterProfile";

const InternalNotes = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 15px;
  padding-top: 2vw;
  padding-bottom: 1vw;
  box-sizing: border-box;
  padding: 15px;
  text-align: left;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 20px;
`;

function FosterAndDogInformation() {
  return (
    <Column>
      <FosterProfile
        name="Amy C."
        ambassadorName="Kristin"
        coordinatorName="Andy L."
        fosterHistory={[{ name: "Lolita" }, { name: "Flower" }]}
      />
      <Meetings
        title="Dog Profile"
        textCard={
          <DogProfileSummary
            // TODO: api call to get actual dog
            dog={{
              name: "tom",
              age: 34,
              gender: "Male",
              breed: "German Dog",
              weight: 40,
              vettingInfo: "sample text",
              backgroundInfo: "sample text",
            }}
          />
        }
        status={
          <Column>
            <StatusUpdate
              title="Ambassador Contact Info"
              ambassador="Dhanush"
              phone="123-456-7890"
              email="test@tap.com"
              status="Not Matched"
            />
            <InternalNotes>Internal Notes:</InternalNotes>
          </Column>
        }
      />
    </Column>
  );
}

export default {
  content: <FosterAndDogInformation />,
};

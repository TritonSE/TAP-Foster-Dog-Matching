/**
 * Application (Admin View) Step 6
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StatusUpdate from "../../../components/StatusUpdate";
import Meetings from "../../../components/Meeting";
import DogProfileSummary from "../../../components/DogProfileSummary";
import { getDog } from "../../../services/dogs";
import ApplicationContext from "../../../contexts/ApplicationContext";


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
  const { applicationState } = React.useContext(ApplicationContext);

  const [dog, setDog] = useState();
  useEffect(() => {
    getDog(applicationState?.finalDog).then((res) => setDog(res.data.dog));
  }, []);

  return (
    <Column>
      <Meetings
        title="Foster  Profile"
        // TODO
      />
      <Meetings
        title="Dog Profile"
        textCard={<DogProfileSummary dog={{ ...dog }} />}
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

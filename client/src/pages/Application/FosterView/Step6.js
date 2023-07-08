/**
 * Application (Foster View) Step 6
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StatusUpdate from "../../../components/StatusUpdate";
import Meetings from "../../../components/Meeting";
import logo from "../../../images/logo-inverted.png";
import doggo from "../../../images/dog.png";
import DogProfileSummary from "../../../components/DogProfileSummary";
import ApplicationContext from "../../../contexts/ApplicationContext";
import { getDog } from "../../../services/dogs";

const FosterResourcesActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 50px 24px;
  gap: 20px;
`;

const Button = styled.div`
  width: 100%;
  padding: 1vw 0;
  cursor: pointer;
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 10px;
  font-size: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

function Intro() {
  const { applicationState } = React.useContext(ApplicationContext);

  return (
    <Meetings
      textCard={
        <div>
          <p>Hello, {applicationState.firstName}</p>

          <p>
            Congratulations!! Your Meet & Greet was a success, you have been passed step 5 and are
            now a TAP foster!
          </p>
          <p>
            Please click on Step 6 to communicate with us during your time fostering. Best, The
            Animal Pad Team
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      imagePath={doggo}
    />
  );
}

function FosterInHomeContent() {
  const navigate = useNavigate();
  const { applicationState } = React.useContext(ApplicationContext);
  const [view, setView] = React.useState("resources");
  const [dog, setDog] = useState();

  useEffect(() => {
    getDog(applicationState?.finalDog).then((res) => setDog(res.data.dog));
  }, []);

  if (view === "resources")
    return (
      <Meetings
        title="Foster Resources"
        textCard={<DogProfileSummary dog={{ ...dog }} />}
        status={
          <RightColumn>
            <StatusUpdate
              title="Ambassador Contact Info"
              ambassador="Dhanush"
              phone="123-456-7890"
              email="test@tap.com"
              tapFacilityLocation="Address"
            />
            <FosterResourcesActions>
              <Button onClick={() => setView("adoption")}>Adopt</Button>
              <Button onClick={() => navigate("/contact")}>Contact</Button>
            </FosterResourcesActions>
          </RightColumn>
        }
      />
    );
  return (
    <Meetings
      title="Adoption"
      textCard={
        <div>
          <p>Hello, {applicationState.firstName}</p>
          <p>
            Thank you for your interest in making an adoption. We are so excited for you to become a
            foster! A member from our adoption team will reach out to you shortly. Please feel free
            to reach out to us if you have any questions for the time being.
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
    />
  );
}

export default {
  intro: <Intro />,
  content: <FosterInHomeContent />,
};

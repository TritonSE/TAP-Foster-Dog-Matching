import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ApplicationProgress from "../components/ApplicationProgress";
import { device } from "../utils/useResponsive";
import DefaultBody from "../components/DefaultBody";
import FosterApplication from "../components/FosterApplication";
import Meetings from "../components/Meeting";
import StatusUpdate from "../components/StatusUpdate";
import goodBoiPic from "../images/good-boi.png";
import logo from "../images/logo-inverted.png";
import ApplicationContext from "../contexts/ApplicationContext";

const ApplicationContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100vw;
  height: calc(100% + 50px);
  margin-bottom: -50px;
  ${device.mobile} {
    flex-direction: row;
  }
`;

const ApplicationContentContainer = styled.div`
  flex: 1;
  ${device.mobile} {
    margin-top: 60px;
  }
`;

const ExitButton = styled.div`
  position: absolute;
  top: -30px;
  left: -10px;
  font-size: 16px;
  cursor: pointer;
  ${device.mobile} {
    top: -20px;
  }
`;

function Application() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(1);

  const goToNextStep = React.useCallback(() => setCurrentStep(currentStep + 1), []);

  const ApplicationContent = [
    <FosterApplication />, //  Step 1
    <h1>step 2 here</h1>, //  Step 2
    <h1>step 3 here</h1>, //  Step 3
    <h1>step 4 here</h1>, //  Step 4
    <h1>step 5 here</h1>, //  Step 5
    <Meetings
      title="Adoption"
      textCard={
        <div>
          <p>Hello, Shelby</p>
          <p>
            Thank you for your interest in making an adoption. We are so excited for you to become a
            foster fail! A member from our adoption team will reach out to you shortly. Please feel
            free to reach out to us if you have any questions for the time being.
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      // status={
      //   <StatusUpdate
      //     title="Interview Info"
      //     ambassador="Dhanush"
      //     phone="123-456-7890"
      //     email="test@tap.com"
      //     date="1/1/2022"
      //     time="6-7:00PM"
      //     location="Zoom"
      //     image={goodBoiPic}
      //   />
      // }
    />, //  Step 6
  ];

  const applicationData = React.useMemo({ currentStep, setCurrentStep, goToNextStep }, []);

  return (
    <DefaultBody>
      <ApplicationContext.Provider value={applicationData}>
        <ApplicationContainer>
          <ExitButton onClick={() => navigate("/dashboard")}>Exit</ExitButton>
          <ApplicationProgress
            currentStep={currentStep}
            unlockedUpToStep={currentStep}
            completedUpToStep={currentStep - 1}
          />
          <ApplicationContentContainer>
            {ApplicationContent[currentStep]}
          </ApplicationContentContainer>
        </ApplicationContainer>
      </ApplicationContext.Provider>
    </DefaultBody>
  );
}

export default Application;

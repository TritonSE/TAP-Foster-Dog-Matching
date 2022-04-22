/**
 *
 * Application Page
 *
 * Content for each step goes in the ApplicationContent array.
 * The indices represent each step of the application (0-indexed)
 *
 * ApplicationContext:
 *
 * Use this context to get the current step and to move to different steps of the application.
 *
 * Value:
 *      - currentStep - number representing current step of the application (0-indexed)
 *      - setCurrentStep(step: number) - go to step in the application. pass in step of the application you want to go to (0-indexed)
 *      - goToNextStep - move to step directly after current step
 *
 * Usage:
 *
 * import ApplicationContext from "../contexts/ApplicationContext";
 *
 * In the component:
 *
 * const { setCurrentStep, setCurrentStep, goToNextStep } = React.useContext(ApplicationContext);
 *
 * (See components/ApplicationProgress.js for complete usage example)
 */

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ApplicationProgress from "../components/ApplicationProgress";
import { device } from "../utils/useResponsive";
import DefaultBody from "../components/DefaultBody";
import FosterApplication from "../components/FosterApplication";
import Meetings from "../components/Meeting";
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
    height: calc(100% + 20px);
    margin-bottom: -20px;
    gap: 10px;
  }
`;

const ApplicationContentContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
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
    top: -10px;
  }
`;

function Application() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);

  const goToNextStep = React.useCallback(
    () => setCurrentStep((step) => Math.min(step + 1, 5)),
    [currentStep]
  );

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
    />, //  Step 6
  ];

  const applicationData = React.useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      goToNextStep,
    }),
    [currentStep, setCurrentStep, goToNextStep]
  );

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

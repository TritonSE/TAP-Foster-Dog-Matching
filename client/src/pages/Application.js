/**
 *
 * Application Page
 *
 * Content for each step goes in the respective objects in the ApplicationContent array where the key represents the sub-step.
 * Intro content for the step (white filled circle) goes in the 'intro' key.
 * Actual content for the step (green filled circle) goes in the 'content' key.
 * The indices represent each step of the application (0-indexed).
 *
 * ApplicationContext:
 *
 * Use this context to get the current step and to move to different steps of the application.
 *
 * Value:
 *      - currentStep - number representing current step of the application (0-indexed)
 *      - currentSubStep - string (either 'intro' or 'content') representing the current sub-step of the application
 *      - goToStep(step: number, subStep: 'intro'|'content') - go to step in the application. pass in step of the application you want to go to (0-indexed)
 *                                                             and the sub-step (either 'intro' or 'content'. default: 'intro').
 *      - goToNextSubStep - move to 'content' sub-step.
 *
 * Usage:
 *
 * import ApplicationContext from "../contexts/ApplicationContext";
 *
 * In the component:
 *
 * const { currentStep, currentSubStep, goToStep, goToNextSubStep } = React.useContext(ApplicationContext);
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
import InterviewInfo from "../components/InterviewInfo";
import StatusUpdate from "../components/StatusUpdate";
import ConfirmMeetGreet from "../components/ConfirmMeetGreet";
import DogSelection from "../components/DogSelection";

const ApplicationContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100vw;
  height: calc(100% + 50px);
  margin-bottom: -50px;
  ${device.tablet} {
    flex-direction: row;
    height: calc(100% + 20px);
    margin-bottom: -20px;
    gap: 10px;
  }
`;

const ApplicationContentContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  ${device.tablet} {
    margin-top: 100px;
  }
  ${device.mobile} {
    margin-top: 20%;
  }
`;

const ExitButton = styled.div`
  position: absolute;
  top: -30px;
  left: -10px;
  font-size: 16px;
  cursor: pointer;
  ${device.tablet} {
    top: -10px;
  }
`;

function Application() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentSubStep, setCurrentSubStep] = React.useState("content");

  const goToNextSubStep = React.useCallback(() => {
    setCurrentSubStep("content");
  }, []);

  const goToStep = React.useCallback((step, subStep = "intro") => {
    setCurrentStep(step);
    setCurrentSubStep(step === 0 ? "content" : subStep);
  }, []);

  const ApplicationContent = [
    {
      content: <FosterApplication />,
    }, //  Step 1
    {
      intro: <h1>step 2 intro here</h1>,
      content: <h1>step 2 content here</h1>,
    }, //  Step 2
    {
      intro: <h1>step 3 intro here</h1>,
      content: (
        <div>
          <Meetings
            title="Interview Information"
            status={
              <StatusUpdate
                title="Interview Info"
                ambassador="Dhanush"
                phone="123-456-7890"
                email="test@tap.com"
                date="1/1/2022"
                time="6-7:00PM"
                location="Zoom"
              />
            }
            // textCard={<div>HELLO THERE</div>}
            interviewInfo={<InterviewInfo contingent title="After Interviews" />}
          />
        </div>
      ),
    }, //  Step 3
    {
      intro: <h1>step 4 intro here</h1>,
      content: <DogSelection />,
    }, //  Step 4
    {
      intro: <h1>step 5 intro here</h1>,
      content: <ConfirmMeetGreet />,
    }, //  Step 5
    {
      intro: <h1>step 6 intro here</h1>,
      content: (
        <Meetings
          title="Adoption"
          textCard={
            <div>
              <p>Hello, Shelby</p>
              <p>
                Thank you for your interest in making an adoption. We are so excited for you to
                become a foster fail! A member from our adoption team will reach out to you shortly.
                Please feel free to reach out to us if you have any questions for the time being.
              </p>
              <p>Best,</p>
              <p>The Animal Pad Team</p>
              <img src={logo} alt="logo" />
            </div>
          }
        />
      ),
    }, //  Step 6
  ];

  const applicationData = React.useMemo(
    () => ({
      currentStep,
      currentSubStep,
      goToStep,
      goToNextSubStep,
    }),
    [currentStep, currentSubStep, goToStep, goToNextSubStep]
  );

  return (
    <DefaultBody>
      <ApplicationContext.Provider value={applicationData}>
        <ApplicationContainer>
          <ExitButton onClick={() => navigate("/dashboard")}>Exit</ExitButton>
          <ApplicationProgress />
          <ApplicationContentContainer>
            {ApplicationContent[currentStep][currentSubStep] ||
              ApplicationContent[currentStep]["intro"] ||
              ApplicationContent[currentStep]["content"]}
          </ApplicationContentContainer>
        </ApplicationContainer>
      </ApplicationContext.Provider>
    </DefaultBody>
  );
}

export default Application;

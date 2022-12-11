/**
 *
 * Application Page
 *
 * Content for each step goes in their respective files in the AdminView/FosterView folders.
 * Each file exports an object with an 'intro' and 'content' key:
 * - Intro content for the step (white filled circle) goes in the 'intro' key (if there is no intro content, this key can be excluded).
 * - Actual content for the step (green filled circle) goes in the 'content' key.
 *
 * ApplicationContext:
 *
 * Use this context to get the current step and to move to different steps of the application.
 *
 * Value:
 *      - view - what view is the application currently in ("user" or "admin")
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
import { useNavigate, useLocation } from "react-router-dom";
import ApplicationProgress from "../../components/ApplicationProgress";
import { device } from "../../utils/useResponsive";
import DefaultBody from "../../components/DefaultBody";
import ApplicationRejected from "../../components/ApplicationRejected";
import ApplicationContext from "../../contexts/ApplicationContext";
import { AuthContext } from "../../contexts/AuthContext";
import { getApplication } from "../../services/application";
import AdminView from "./AdminView";
import FosterView from "./FosterView";

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
    height: fit-content;
    margin-bottom: -20px;
    gap: 10px;
  }
`;

const ApplicationContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
`;

const ExitButton = styled.div`
  position: absolute;
  top: -30px;
  left: -10px;
  font-size: 16px;
  cursor: pointer;
  ${device.tablet} {
    position: fixed;
    top: 130px;
    left: 190px;
  }
  ${device.mobile} {
    top: 100px;
    left: 10px;
  }
`;

function Application({ id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = React.useContext(AuthContext);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentSubStep, setCurrentSubStep] = React.useState("content");
  const [applicationView, setApplicationView] = React.useState(); // Note: change this to 'foster' or 'admin' to test different views
  const [applicationId, setApplicationId] = React.useState(id); // || "629846dd3f626453c2ba9de6"); // TODO: remove hardcoded applicationId
  const [applicationState, setApplicationState] = React.useState();

  React.useEffect(() => {
    if (currentUser) setApplicationView(currentUser.type);
  }, [currentUser]);

  // get data if a application id is provided
  React.useEffect(() => {
    if (location.state) {
      setApplicationId(location.state.id);
      getApplication(applicationId).then((res) => {
        setApplicationState(res.data.application);
      });
    }
    if (applicationId) {
      getApplication(applicationId).then((res) => {
        setApplicationState(res.data.application);
      });
    }
  }, [applicationId]);

  // Switch application content based on current user role
  const applicationContent = React.useMemo(
    () => (applicationView === "admin" ? AdminView : FosterView),
    [applicationView]
  );

  const goToNextSubStep = React.useCallback(() => {
    setCurrentSubStep("content");
  }, []);

  const goToStep = React.useCallback(
    (step, subStep = "intro") => {
      setCurrentStep(step);
      setCurrentSubStep(
        step === 0 || applicationContent[step].intro === undefined ? "content" : subStep
      );
    },
    [applicationContent]
  );

  const applicationData = React.useMemo(
    () => ({
      applicationView,
      currentStep,
      currentSubStep,
      goToStep,
      goToNextSubStep,
      applicationId,
      setApplicationId,
      applicationState,
      setApplicationState,
    }),
    [
      applicationView,
      currentStep,
      currentSubStep,
      goToStep,
      goToNextSubStep,
      applicationId,
      setApplicationId,
      applicationState,
      setApplicationState,
    ]
  );
  return (
    <DefaultBody>
      <ApplicationContext.Provider value={applicationData}>
        <ApplicationContainer>
          <ExitButton onClick={() => navigate("/dashboard")}>Exit</ExitButton>
          <ApplicationProgress />
          <ApplicationContentContainer>
            {applicationState && applicationState.status === "rejected" ? (
              <ApplicationRejected />
            ) : (
              applicationContent[currentStep][currentSubStep] ||
              applicationContent[currentStep]["intro"] ||
              applicationContent[currentStep]["content"]
            )}
          </ApplicationContentContainer>
        </ApplicationContainer>
      </ApplicationContext.Provider>
    </DefaultBody>
  );
}

export default Application;

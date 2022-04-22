/**
 * Application Progress Component
 *
 * Component that renders the Foster Application progress bar
 *
 * Used in: Application Page
 *
 */
import React from "react";
import styled from "styled-components";
import { Colors } from "./Theme";
import check from "../images/check.png";
import useResponsive, { device } from "../utils/useResponsive";
import ApplicationContext from "../contexts/ApplicationContext";

const MILESTONES = [
  "Application Submitted",
  "Initial Interview",
  "Home Screen",
  "Foster Matching",
  "Meet & Greet",
  "Foster in Home",
];

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 60px;
  ${device.mobile} {
    flex-direction: column;
    margin-top: 40px;
    margin-bottom: 20px;
  }
`;

const ProgressMilestoneBarSection = styled.div`
  flex: 1;
  width: calc(100% + 20px);
  margin: 0 -10px;
  background: ${(props) => (props.completed ? Colors.green : "black")};
  height: 16px;
  ${device.mobile} {
    margin: -10px 0;
    width: 16px;
    height: calc(100% + 20px);
  }
`;

const ProgressMilestone = styled.div`
  z-index: 2;
  font-weight: bold;
  font-size: 16px;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  border-radius: 50%;
  background: ${(props) => {
    if (props.unlocked) return "white";
    if (props.active) return Colors.green;
    return "black";
  }};
  border: 5px solid ${(props) => (props.active ? Colors.green : "black")};
  color: ${(props) => (props.unlocked ? "black" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${(props) => (props.clickable ? "pointer" : "unset")};
  ${device.mobile} {
    font-size: 4vw;
    width: 50px;
    height: 50px;
  }
`;

const ProgressMilestoneText = styled.div`
  font-weight: normal;
  position: absolute;
  color: black;
  top: calc(100% + 6px);
  text-align: center;
  min-width: 60px;
  ${device.mobile} {
    top: -30px;
    left: 75%;
    font-size: 3vw;
    min-width: 50px;
  }
`;

function ApplicationProgress() {
  const { currentStep, currentSubStep, goToStep, goToNextSubStep } =
    React.useContext(ApplicationContext);
  const { isMobile } = useResponsive();

  // TODO: Block onClick if step is not unlocked yet
  const handleStepClicked = React.useCallback(
    (index) => {
      if (currentStep === index) goToNextSubStep();
      else goToStep(index);
    },
    [currentStep, goToNextSubStep, goToStep]
  );

  return (
    <ProgressBarContainer>
      {isMobile && <ProgressMilestoneText>{MILESTONES[currentStep]}</ProgressMilestoneText>}
      {MILESTONES.map((milestone, index) => (
        <React.Fragment key={milestone}>
          <ProgressMilestone
            active={index <= currentStep}
            unlocked={currentStep === index && currentSubStep === "intro"}
            clickable={index <= currentStep}
            onClick={() => handleStepClicked(index)}
          >
            {index <= currentStep - 1 ? (
              <img src={check} alt="check mark" width={isMobile ? 40 : 50} />
            ) : (
              index + 1
            )}
            {!isMobile && <ProgressMilestoneText>{milestone}</ProgressMilestoneText>}
          </ProgressMilestone>
          {index < MILESTONES.length - 1 && (
            <ProgressMilestoneBarSection
              completed={index < currentStep - 1 || index < currentStep}
            />
          )}
        </React.Fragment>
      ))}
    </ProgressBarContainer>
  );
}

export default ApplicationProgress;

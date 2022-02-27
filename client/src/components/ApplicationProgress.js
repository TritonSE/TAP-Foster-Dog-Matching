/**
 * Application Progress Component
 *
 * Component that renders the Foster Application progress bar
 *
 * Used on: Applications
 *
 * Props:
 *  - currentStep [number] - int representing the current active step (0-indexed)
 *  - unlockedUpToStep [number] - int representing the farthest unlocked step (0-indexed)
 *  - completedUpToStep [number] - int representing the farthest completed step (0-indexed)
 */
import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "./Theme";
import check from "../images/check.png";
import useResponsive, { device } from "../utils/useResponsive";

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
  padding: 20px;
  margin-bottom: 40px;
  position: relative;
  flex: 1;
  ${device.mobile} {
    flex-direction: column;
    margin-bottom: 0;
    padding: 5px;
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
    if (props.active) return Colors.green;
    if (props.unlocked) return "white";
    return "black";
  }};
  ${(props) =>
    props.unlocked &&
    !props.active &&
    css`
      border: 5px solid ${Colors.green};
    `}
  color: ${(props) => {
    if (props.active) return "white";
    if (props.unlocked) return "black";
    return "white";
  }};
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
  ${device.mobile} {
    top: 20px;
    left: 90%;
    font-size: 3vw;
  }
`;

function ApplicationProgress({ currentStep, unlockedUpToStep, completedUpToStep }) {
  const { isMobile } = useResponsive();

  return (
    <ProgressBarContainer>
      {isMobile && <ProgressMilestoneText>{MILESTONES[currentStep]}</ProgressMilestoneText>}
      {MILESTONES.map((milestone, index) => (
        <React.Fragment key={milestone}>
          <ProgressMilestone
            active={index === currentStep || index <= completedUpToStep}
            unlocked={index === unlockedUpToStep}
            clickable={index <= unlockedUpToStep}
          >
            {index <= completedUpToStep ? <img src={check} alt="check mark" /> : index + 1}
            {!isMobile && <ProgressMilestoneText>{milestone}</ProgressMilestoneText>}
          </ProgressMilestone>
          {index < MILESTONES.length - 1 && (
            <ProgressMilestoneBarSection
              completed={index < completedUpToStep || index < unlockedUpToStep}
            />
          )}
        </React.Fragment>
      ))}
    </ProgressBarContainer>
  );
}

export default ApplicationProgress;

/**
 * Application Progress Component
 *
 * Used on: Applications
 *
 * Props:
 *  TODO
 */

import styled, { css } from "styled-components";
import { Colors } from "./Theme";
import check from "../images/check.png";

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
`;

const ProgressMilestoneBarSection = styled.div`
  flex: 1;
  width: calc(100% + 20px);
  margin: 0 -10px;
  background: ${(props) => (props.completed ? Colors.green : "black")};
  height: 16px;
`;

const ProgressMilestone = styled.div`
  z-index: 2;
  font-weight: bold;
  font-size: 16px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) => (props.active ? Colors.green : props.unlocked ? "white" : "black")};
  ${(props) =>
    props.unlocked &&
    css`
      border: 5px solid ${Colors.green};
    `}
  color: ${(props) => (props.active ? "white" : props.unlocked ? "black" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${(props) => (props.clickable ? "pointer" : "unset")};
`;

const ProgressMilestoneText = styled.div`
  font-weight: normal;
  position: absolute;
  color: black;
  top: calc(100% + 6px);
  text-align: center;
`;

function ApplicationProgress({ currentStep, unlockedUpToStep, completedUpToStep }) {
  return (
    <ProgressBarContainer>
      {MILESTONES.map((milestone, index) => (
        <>
          <ProgressMilestone
            active={index === currentStep || index <= completedUpToStep}
            unlocked={index === unlockedUpToStep}
            clickable={index <= unlockedUpToStep}
          >
            {index <= completedUpToStep ? <img src={check} /> : index + 1}
            <ProgressMilestoneText>{milestone}</ProgressMilestoneText>
          </ProgressMilestone>
          {index < MILESTONES.length - 1 && (
            <ProgressMilestoneBarSection
              completed={index < completedUpToStep || index < unlockedUpToStep}
            />
          )}
        </>
      ))}
    </ProgressBarContainer>
  );
}

export default ApplicationProgress;
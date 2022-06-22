/**
 * Application (Admin View) Step 3
 */

import React from "react";
import LoadingBox from "../../../components/LoadingBox";
import Meeting from "../../../components/Meeting";
import StatusUpdate from "../../../components/StatusUpdate";
import InterviewInfo from "../../../components/InterviewInfo";
import FOSTER_EVALUATION_INITIAL_MESSAGES from "../../../constants/FOSTER_EVALUATION_INITIAL_MESSAGES";
import { updateApplication } from "../../../services/application";
import ApplicationContext from "../../../contexts/ApplicationContext";

function HomeScreenInformation() {
  const { applicationId, setApplicationState } = React.useContext(ApplicationContext);
  const waiting = false; // TODO: use actual application status

  const onPassConfirm = React.useCallback(
    (content) => {
      const reqBody = {
        messages: {
          stage3: content,
        },
      };
      updateApplication(applicationId, reqBody).then((response) =>
        setApplicationState(response.data.application)
      );
    },
    [applicationId]
  );

  const onContingentConfirm = React.useCallback(
    (content) => {
      const reqBody = {
        messages: {
          stage3: content,
        },
      };
      updateApplication(applicationId, reqBody).then((response) =>
        setApplicationState(response.data.application)
      );
    },
    [applicationId]
  );

  const onRejectConfirm = React.useCallback(
    (content) => {
      const reqBody = {
        status: "rejected",
        messages: {
          stage3: content,
        },
      };
      updateApplication(applicationId, reqBody).then((response) =>
        setApplicationState(response.data.application)
      );
    },
    [applicationId]
  );

  if (waiting)
    return (
      <LoadingBox
        message="Waiting for applicant to respond, click on the progress bar to see previous steps"
        currentStage="Applicant is scheduling their interview"
      />
    );

  return (
    <Meeting
      title="Home Screen Information"
      status={
        <StatusUpdate
          title="Home Screen Info"
          ambassador="Dhanush"
          phone="123-456-7890"
          email="test@tap.com"
          date="1/1/2022"
          time="6-7:00PM"
          location="Zoom"
        />
      }
      interviewInfo={
        <InterviewInfo
          title="After Home Screen"
          passInitialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.HOME_SCREEN.PASS}
          rejectInitialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.HOME_SCREEN.REJECT}
          contingentInitialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.HOME_SCREEN.CONTINGENT}
          onPassConfirm={onPassConfirm}
          onRejectConfirm={onRejectConfirm}
          onContingentConfirm={onContingentConfirm}
          contingent
        />
      }
    />
  );
}

export default {
  content: <HomeScreenInformation />,
};

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
import APPLICATION_STAGES from "../../../constants/APPLICATION_STAGES";
import useInterview from "../../../hooks/useInterview";

function HomeScreenInformation() {
  const { applicationId, setApplicationState, applicationState, goToStep } =
    React.useContext(ApplicationContext);
  const { interview } = useInterview(applicationState.user, APPLICATION_STAGES.HOME_SCREEN);

  const onPassConfirm = React.useCallback(
    (content) => {
      const reqBody = {
        messages: {
          stage3: content,
        },
        status: "Step 4: Foster Matching",
      };
      updateApplication(applicationId, reqBody).then((response) => {
        setApplicationState(response.data.application);
        goToStep((step) => step + 1);
      });
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

  if (!interview)
    return (
      <LoadingBox
        message="Waiting for applicant to respond, click on the progress bar to see previous steps"
        currentStage="Applicant is scheduling their interview"
      />
    );

  return (
    <Meeting
      title="Home Screen Information"
      status={<StatusUpdate title="Home Screen Info" {...interview} />}
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

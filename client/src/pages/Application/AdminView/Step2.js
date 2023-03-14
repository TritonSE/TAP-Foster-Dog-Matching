/**
 * Application (Admin View) Step 2
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

function InterviewInformation() {
  const { applicationId, setApplicationState, applicationState } =
    React.useContext(ApplicationContext);
  const { interview } = useInterview(applicationState.user, APPLICATION_STAGES.INITIAL_INTERVIEW);

  const onPassConfirm = React.useCallback(
    (content) => {
      const reqBody = {
        messages: {
          stage2: content,
        },
        status: "Step 3: Home Screen",
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
          stage2: content,
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
      title="Interview Information"
      status={<StatusUpdate title="Interview Info" {...interview} />}
      interviewInfo={
        <InterviewInfo
          title="After Interview"
          passInitialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.INTERVIEW.PASS}
          rejectInitialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.INTERVIEW.REJECT}
          onPassConfirm={onPassConfirm}
          onRejectConfirm={onRejectConfirm}
        />
      }
    />
  );
}

export default {
  content: <InterviewInformation />,
};

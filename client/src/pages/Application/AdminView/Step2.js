/**
 * Application (Admin View) Step 2
 */

import React from "react";
import LoadingBox from "../../../components/LoadingBox";
import Meeting from "../../../components/Meeting";
import StatusUpdate from "../../../components/StatusUpdate";
import InterviewInfo from "../../../components/InterviewInfo";
import FOSTER_EVALUATION_INITIAL_MESSAGES from "../../../constants/FOSTER_EVALUATION_INITIAL_MESSAGES";

function InterviewInformation() {
  const waiting = false; // TODO: use actual application status

  if (waiting)
    return (
      <LoadingBox
        message="Waiting for applicant to respond, click on the progress bar to see previous steps"
        currentStage="Applicant is scheduling their interview"
      />
    );

  return (
    <Meeting
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
      interviewInfo={
        <InterviewInfo
          title="After Interview"
          passInitialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.INTERVIEW.PASS}
          rejectInitialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.INTERVIEW.REJECT}
        />
      }
    />
  );
}

export default {
  content: <InterviewInformation />,
};

/**
 * Application (Admin View) Step 3
 */

import React from "react";
import LoadingBox from "../../../components/LoadingBox";
import Meeting from "../../../components/Meeting";
import StatusUpdate from "../../../components/StatusUpdate";
import InterviewInfo from "../../../components/InterviewInfo";

function HomeScreenInformation() {
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
      interviewInfo={<InterviewInfo title="After Home Screen" contingent />}
    />
  );
}

export default {
  content: <HomeScreenInformation />,
};
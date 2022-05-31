/**
 * Application (Admin View) Step 3
 */

import React from "react";
import LoadingBox from "../../../components/LoadingBox";
import Meeting from "../../../components/Meeting";
import StatusUpdate from "../../../components/StatusUpdate";
import InterviewInfo from "../../../components/InterviewInfo";

export default {
  content: (
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
      interviewInfo={<InterviewInfo contingent title="After Interviews" />}
    />
  ),
  // content: (
  //   <LoadingBox
  //     message="Waiting for applicant to respond, click on the progress bar to see previous steps"
  //     currentStage="Applicant is scheduling their interview"
  //   />
  // ),
};

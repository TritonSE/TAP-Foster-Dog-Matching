import React from "react";
// import PassFail from "../components/PassFail";
import LoadingBox from "../components/LoadingBox";
import InterviewInfo from "../components/InterviewInfo"
function Landing() {
  return (
    <div>
      <h1>Landing</h1>
      {/* <PassFail 
        status = 'Pass'
        initialMessage = '<p>Test Message, I love food!</p>'
      /> */}

      {/* <LoadingBox
        message= "Waiting for applicant to respond, click on the progress bar to see previous steps"
        currentStage="Applicant is scheduling their interview"
      /> */}

      <InterviewInfo>

      </InterviewInfo>
    </div>
  );
}

export default Landing;

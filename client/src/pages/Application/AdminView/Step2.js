/**
 * Application (Admin View) Step 2
 */

import React from "react";
import LoadingBox from "../../../components/LoadingBox";

export default {
  content: (
    <LoadingBox
      message="Waiting for applicant to respond, click on the progress bar to see previous steps"
      currentStage="Applicant is scheduling their interview"
    />
  ),
};

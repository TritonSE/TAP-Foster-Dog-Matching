/**
 * Application (Admin View) Step 4
 */

import React from "react";
import FosterMatchingAdmin from "../../../components/FosterMatchingAdmin";
import DogSelection from "../../../components/DogSelection";
import LoadingBox from "../../../components/LoadingBox";

const VIEW = {
  AVAILABLE_DOGS: "availableDogs",
  WAITING: "waiting",
  CONFIRM_MEET_AND_GREET: "confirmMeetAndGreet",
};

function AdminFosterMatchingFlow() {
  const [view, setView] = React.useState(VIEW.CONFIRM_MEET_AND_GREET); // NOTE: manually set to to VIEW.CONFIRM_MEET_AND_GREET to see DogSelection component

  const handleSelectAvailableDogs = () => {
    // TODO: handle saving available dog logic here
    setView(VIEW.WAITING);
  };

  if (view === VIEW.AVAILABLE_DOGS)
    return <FosterMatchingAdmin handleConfirm={handleSelectAvailableDogs} />;
  if (view === VIEW.WAITING)
    return (
      <LoadingBox
        message="Waiting for applicant to respond, click on the progress bar to see previous steps"
        currentStage="Applicant is scheduling their interview"
      />
    );
  return <DogSelection />;
}

export default {
  content: <AdminFosterMatchingFlow />,
};

/**
 * Application (Admin View) Step 4
 */

import React, { useState, useEffect } from "react";
import FosterMatchingAdmin from "../../../components/FosterMatchingAdmin";
import DogSelection from "../../../components/DogSelection";
import LoadingBox from "../../../components/LoadingBox";
import useInterview from "../../../hooks/useInterview";
import ApplicationContext from "../../../contexts/ApplicationContext";
import APPLICATION_STAGES from "../../../constants/APPLICATION_STAGES";
import { updateApplication } from "../../../services/application";

const VIEW = {
  AVAILABLE_DOGS: "availableDogs",
  WAITING: "waiting",
  CONFIRM_MEET_AND_GREET: "confirmMeetAndGreet",
};

function AdminFosterMatchingFlow() {
  const { applicationId, applicationState, setApplicationState } =
    React.useContext(ApplicationContext);
  const [view, setView] = React.useState(VIEW.AVAILABLE_DOGS);
  const { interview } = useInterview(applicationState.user, APPLICATION_STAGES.HOME_SCREEN);
  const [selectedDogs, setSelectedDogs] = useState(() => new Set()); // set of ids of admin checked dogs

  useEffect(() => {
    if (
      applicationState.preference.length === applicationState.selectedDogs.length &&
      applicationState.selectedDogs.length > 0
    )
      setView(VIEW.CONFIRM_MEET_AND_GREET);
    else if (interview) setView(VIEW.CONFIRM_MEET_AND_GREET);
    else if (applicationState.selectedDogs.length > 0) setView(VIEW.WAITING);
  }, []);

  const handleSelectAvailableDogs = () => {
    // update dogs admin selected
    const reqBody = {
      selectedDogs: Array.from(selectedDogs),
      preference: Array(selectedDogs.size).fill("?"),
    };
    updateApplication(applicationId, reqBody).then((response) =>
      setApplicationState(response.data.application)
    );
    setView(VIEW.WAITING);
  };

  if (view === VIEW.AVAILABLE_DOGS)
    return (
      <FosterMatchingAdmin
        handleConfirm={handleSelectAvailableDogs}
        selectedDogs={{ selectedDogs, setSelectedDogs }}
      />
    );
  if (view === VIEW.WAITING)
    return (
      <LoadingBox
        message="Waiting for applicant to respond, click on the progress bar to see previous steps"
        currentStage="Applicant is inputting their dog preferences"
      />
    );
  return <DogSelection />;
}

export default {
  content: <AdminFosterMatchingFlow />,
};

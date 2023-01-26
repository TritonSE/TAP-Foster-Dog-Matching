/**
 * Application (Admin View) Step 4
 */

import React from "react";
import FosterMatchingAdmin from "../../../components/FosterMatchingAdmin";
import DogSelection from "../../../components/DogSelection";
import LoadingBox from "../../../components/LoadingBox";
import useInterview from "../../../hooks/useInterview";
import ApplicationContext from "../../../contexts/ApplicationContext";
import APPLICATION_STAGES from "../../../constants/APPLICATION_STAGES";

const VIEW = {
  AVAILABLE_DOGS: "availableDogs",
  WAITING: "waiting",
  CONFIRM_MEET_AND_GREET: "confirmMeetAndGreet",
};

function AdminFosterMatchingFlow() {
  const { applicationState } = React.useContext(ApplicationContext);
  const [view, setView] = React.useState(VIEW.AVAILABLE_DOGS);
  const { interview } = useInterview(applicationState.user, APPLICATION_STAGES.HOME_SCREEN);

  React.useEffect(() => {
    if (interview) setView(VIEW.CONFIRM_MEET_AND_GREET);
    else if (applicationState.selectedDogs.length > 0) setView(VIEW.WAITING);
  }, []);

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

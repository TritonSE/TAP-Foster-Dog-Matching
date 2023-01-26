/**
 * Application (Foster View) Step 2
 */

import React from "react";
import MeetingScheduling from "../../../components/MeetingScheduling";
import StatusUpdate from "../../../components/StatusUpdate";
import Meetings from "../../../components/Meeting";
import logo from "../../../images/logo-inverted.png";
import doggo from "../../../images/good-boi.png";
import ApplicationContext from "../../../contexts/ApplicationContext";
import APPLICATION_STAGES from "../../../constants/APPLICATION_STAGES";
import useInterview from "../../../hooks/useInterview";

function Intro() {
  const { applicationState } = React.useContext(ApplicationContext);

  return (
    <Meetings
      textCard={
        <div>
          <p className="message-from-admin">
            {applicationState.messages.stage1.replace(/\n/g, "\n\n")}
          </p>
          <img src={logo} alt="logo" />
        </div>
      }
      imagePath={doggo}
    />
  );
}

function ScheduleInterview() {
  const { applicationState } = React.useContext(ApplicationContext);
  const [view, setView] = React.useState("schedule");
  const { interview, refetchInterview } = useInterview(
    applicationState.user,
    APPLICATION_STAGES.INITIAL_INTERVIEW
  );

  React.useEffect(() => {
    if (interview) setView("confirmed");
  }, [interview]);

  const setInterviewConfirmed = React.useCallback(() => {
    refetchInterview();
    setView("confirmed");
  }, []);

  if (view === "schedule")
    return (
      <MeetingScheduling
        title="Interview Scheduling"
        stage={APPLICATION_STAGES.INITIAL_INTERVIEW}
        times={[
          "11:00 AM",
          "11:30 AM",
          "12:00 PM",
          "12:30 PM",
          "1:00 PM",
          "5:00 PM",
          "5:30 PM",
          "6:00 PM",
          "6:30 PM",
          "7:00 PM",
        ]}
        interviewConfirmedCallback={setInterviewConfirmed}
      />
    );
  return (
    <Meetings
      title="Interview Confirmed"
      textCard={
        <div>
          <p>Hello, {applicationState.firstName}</p>
          <p>
            Your interview has been confirmed! An ambassador from TAP has been assigned to your
            application and they will be in contact with you shortly.
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      status={<StatusUpdate title="Interview Info" {...interview} />}
    />
  );
}

export default {
  intro: <Intro />,
  content: <ScheduleInterview />,
};

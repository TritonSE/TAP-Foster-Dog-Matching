/**
 * Application (Foster View) Step 3
 */

import React from "react";
import MeetingScheduling from "../../../components/MeetingScheduling";
import StatusUpdate from "../../../components/StatusUpdate";
import Meetings from "../../../components/Meeting";
import logo from "../../../images/logo-inverted.png";
import doggo from "../../../images/good-boi.png";
import ApplicationContext from "../../../contexts/ApplicationContext";

function Intro() {
  const { applicationState } = React.useContext(ApplicationContext);

  return (
    <Meetings
      textCard={
        <div>
          <p className="message-from-admin">
            {applicationState.messages.stage2.replace(/\n/g, "\n\n")}
          </p>
          <img src={logo} alt="logo" />
        </div>
      }
      imagePath={doggo}
    />
  );
}

function ScheduleHomeScreen() {
  const [view, setView] = React.useState("schedule");
  const { applicationState } = React.useContext(ApplicationContext);

  const setInterviewConfirmed = React.useCallback(() => setView("confirmed"), []);

  if (view === "schedule")
    return (
      <MeetingScheduling
        title="Home Screen Scheduling"
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
      title="Home Screen Confirmed"
      textCard={
        <div>
          <p>Hello, {applicationState.firstName}</p>
          <p>
            Your Home Screen has been confirmed! An ambassador from TAP has been assigned to your
            application and they will be in contact with you shortly.
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
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
    />
  );
}

export default {
  intro: <Intro />,
  content: <ScheduleHomeScreen />,
};

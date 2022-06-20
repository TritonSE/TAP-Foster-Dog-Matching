/**
 * Application (Foster View) Step 5
 */

import React from "react";
import MeetingScheduling from "../../../components/MeetingScheduling";
import StatusUpdate from "../../../components/StatusUpdate";
import Meetings from "../../../components/Meeting";
import logo from "../../../images/logo-inverted.png";
import doggo from "../../../images/good-boi.png";

function ScheduleMeetAndGreet() {
  const [view, setView] = React.useState("schedule");

  const setInterviewConfirmed = React.useCallback(() => setView("confirmed"), []);
  if (view === "schedule")
    return (
      <MeetingScheduling
        title="Meet & Greet Scheduling"
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
      title="Meet & Greet Confirmed"
      textCard={
        <div>
          <p>Hello, Shelby</p>
          <p>
            Your Meet & Greet has been confirmed! An ambassador from TAP has been assigned to your
            application and they will be in contact with you shortly.
          </p>
          <p>
            If you have any young children or other dogs please bring them to your Meet & Greet! If
            it goes well you will be taking your foster dog home after the Meet & Greet!
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      status={
        <StatusUpdate
          title="Meet & Greet Info"
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
  intro: (
    <Meetings
      textCard={
        <div>
          {/* TODO */}
          <img src={logo} alt="logo" />
        </div>
      }
      imagePath={doggo}
    />
  ),
  content: <ScheduleMeetAndGreet />,
};

// Using this page to test component. TODO: Revert this back to original
// once testing is finished with this component.

import React from "react";
import MeetingScheduling from "../components/MeetingScheduling";

function Calendar() {
  const meetTimes = [
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
  ];

  return (
    <div>
      <MeetingScheduling title="Interview Scheduling" times={meetTimes} />
    </div>
  );
}

export default Calendar;

import React from "react";
import MeetingScheduling from "../components/MeetingScheduling";
// Remove TimeScheduling when done with testing

function Register() {
  /* return (
    <div>
      <h1>Register</h1>
    </div>
  ); */
  return (
    <MeetingScheduling
      title="Interview Scheduling"
      stage="Initial Interview"
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
    />
  );
}

export default Register;

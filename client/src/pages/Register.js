import React from "react";
import MeetingScheduling from "../components/MeetingScheduling";
import Header from "../components/Header";
import IntroForm from "../components/IntroForm";
import dog from "../images/dog.png";
import "../css/register.css";
// Remove TimeScheduling when done with testing

function Register() {
  return (
    <div className="intro-page">
      {/* <Header />
      <IntroForm formType="signup" accountType="Foster" header="Foster Sign Up" /> */}
      {/* <IntroForm formType="signup" accountType="Admin" header="Admin Sign Up" /> */}
      {/* <IntroForm formType="signup-key" accountType="Foster" header="Foster Sign Up" /> */}
      {/* <IntroForm formType="signup-key" accountType="Admin" header="Admin Sign Up" /> */}
      {/* <div className="right-panel">
        <img className="dog-image" src={dog} alt="Cute dog!" />
        <div className="copyright">
          © 2020 The Animal Pad | All rights reserved
          <div>The Animal Pad is a 501c3 Organization EIN #45-4902841.</div>
        </div>
      </div> */}
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
    </div>
  );
}

export default Register;

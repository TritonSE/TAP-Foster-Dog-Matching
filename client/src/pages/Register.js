import React from "react";
import StartHeader from "../components/StartHeader";
import Form from "../components/Form";
import dog from "../images/dog.png";
import "../styles/register.css";

function Register() {
  return (
    <div>
      <StartHeader />
      <Form formType="signup" header="Management Sign Up" />
      {/* <Form accountType="Management" formType="signup-key" header="Management Sign Up" /> */}
      <div className="right-panel">
        <img className="dog-image" src={dog} alt="Cute dog!" />
        <div className="copyright">
          © 2020 The Animal Pad | All rights reserved
          <div>The Animal Pad is a 501c3 Organization EIN #45-4902841.</div>
        </div>
      </div>
    </div>
  );
}

export default Register;

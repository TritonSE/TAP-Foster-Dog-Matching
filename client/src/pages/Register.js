import React from "react";
import Header from "../components/Header";
import IntroForm from "../components/IntroForm";
import dog from "../images/dog.png";
import "../css/register.css";

function Register() {
  return (
    <div>
      <Header />
      <IntroForm formType="signup" accountType="Foster" header="Foster Sign Up" />
      {/* <IntroForm formType="signup" accountType="Admin" header="Admin Sign Up" /> */}
      {/* <IntroForm formType="signup-key" accountType="Foster" header="Foster Sign Up" /> */}
      {/* <IntroForm formType="signup-key" accountType="Admin" header="Admin Sign Up" /> */}
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

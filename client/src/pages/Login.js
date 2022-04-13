/**
 * Login Component
 *
 * @summary  Component for the login page, which uses the header and form components.
 * @author   Artyom Muradyan
 *
 * TODO: Make signup button functional.
 */

import React from "react";
import StartHeader from "../components/StartHeader";
import IntroForm from "../components/IntroForm";
import dog from "../images/dog.png";
import "../styles/login.css";

function Login() {
  return (
    <div>
      <StartHeader />
      <IntroForm formType="login" header="Foster Log In" />
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

export default Login;

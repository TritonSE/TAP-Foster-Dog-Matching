/**
 * Login Component
 *
 * @summary  Component for the login page, which uses the header and form components.
 * @author   Artyom Muradyan
 *
 * TODO: Make signup button functional.
 */

import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import IntroForm from "../components/IntroForm";
import dog from "../images/dog.png";
import "../css/login.css";

function Login() {
  const { state } = useLocation();

  return (
    <div className="intro-page">
      <Header />
      <IntroForm
        formType="login"
        header={`${state ? state.accountType : "Foster"} Log In`}
        accountType={state ? state.accountType : "Foster"}
      />
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

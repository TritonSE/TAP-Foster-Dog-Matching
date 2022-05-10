/**
 * IntroForm Component
 *
 * @summary  Reusable form component for the landing, login and register page, with a custom header.
 * @author   Artyom Muradyan
 *
 */

import React from "react";
import Button from "./Button";

function IntroForm(props) {
  let content;

  switch (props.formType) {
    case "landing": {
      content = (
        <>
          <div className="form-landing-question">Are you a...</div>
          <Button buttonLink="/login" className="foster" name="Foster" />
          <Button buttonLink="/login" className="admin" name="Admin" />
        </>
      );
      break;
    }
    case "login": {
      content = (
        <>
          <input type="email" className="login-email" placeholder="Email" />
          <input type="password" className="login-password" placeholder="Password" />
          {/* TODO: Make Login button work */}
          <Button className="login" name="Log In" />
          <a href="/register" className="sign-up">
            Sign Up
          </a>
        </>
      );
      break;
    }
  }

  return (
    <div className="left-panel">
      <div className="form-container" id={"form-container-" + props.formType}>
        <b className="form-header" id={"form-header-" + props.formType}>
          {" "}
          {props.header}{" "}
        </b>
        {content}
      </div>
      <div className="copyright-mobile">
        © 2020 The Animal Pad | All rights reserved
        <div>The Animal Pad is a 501c3 Organization EIN #45-4902841.</div>
      </div>
    </div>
  );
}

export default IntroForm;

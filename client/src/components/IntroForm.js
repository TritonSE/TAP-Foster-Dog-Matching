/**
 * Form Component
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
    case "signup": {
      if (props.accountType === "Admin") {
        content = (
          <>
            <div className="form-signup-question"> I am a... </div>
            <select className="selector">
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="management">Management</option>
              <option value="ambassador">Ambassador</option>
              <option value="coordinator">Coordinator</option>
            </select>
            <input className="signup-first-name" placeholder="First Name" />
            <input className="signup-last-name" placeholder="Last Name" />
            <input type="email" className="signup-email" placeholder="Email" />
            <input type="password" className="signup-password" placeholder="Password" />
            <input type="password" className="signup-re-password" placeholder="Re-enter Password" />
            {/* TODO: Make Signup button work */}
            <Button className="signup" name="Continue" />
            <a href="/login" className="log-in">
              Log In
            </a>
          </>
        );
      } else if (props.accountType === "Foster") {
        content = (
          <>
            <input className="signup-first-name" placeholder="First Name" />
            <input className="signup-last-name" placeholder="Last Name" />
            <input type="email" className="signup-email" placeholder="Email" />
            <input type="password" className="signup-password" placeholder="Password" />
            <input type="password" className="signup-re-password" placeholder="Re-enter Password" />
            {/* TODO: Make Signup button work */}
            <Button className="signup" name="Continue" />
            <a href="/login" className="log-in">
              Log In
            </a>
          </>
        );
      }

      break;
    }
    case "signup-key": {
      content = (
        <>
          <a href="/register" className="back-to-register">
            Back
          </a>
          <div className="form-signup-key-text">
            {" "}
            Please enter the correct {props.accountType} sign up key to complete account creation.{" "}
          </div>
          <div className="key-input">
            <input type="text" maxLength="1" id="key-1" />
            <input type="text" maxLength="1" id="key-2" />
            <input type="text" maxLength="1" id="key-3" />
            <input type="text" maxLength="1" id="key-4" />
            <input type="text" maxLength="1" id="key-5" />
          </div>
          {/* TODO: Make Confirm button work */}
          <Button className="confirm" name="Confirm" />
        </>
      );

      window.onload = function moveFocus() {
        const key1 = document.getElementById("key-1");
        const key2 = document.getElementById("key-2");
        const key3 = document.getElementById("key-3");
        const key4 = document.getElementById("key-4");
        const key5 = document.getElementById("key-5");

        key1.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key1.value = "";
          } else {
            key2.focus();
          }
        });
        key2.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key2.value = "";
            key1.focus();
          } else {
            key3.focus();
          }
        });
        key3.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key3.value = "";
            key2.focus();
          } else {
            key4.focus();
          }
        });
        key4.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key4.value = "";
            key3.focus();
          } else {
            key5.focus();
          }
        });
        key5.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key5.value = "";
            key4.focus();
          }
        });
      };

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

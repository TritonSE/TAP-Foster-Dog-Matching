import React from "react";
import logo from "../images/logo.png";
import "../styles/loginheader.css";

function LoginHeader() {
  return (
    <div id="header">
      <img id="header-logo" src={logo} alt="The Animal Pad" />
      <div id="header-message">
        <span>
          TAP is an all-breed, non-profit Dog Rescue Organization based in San Diego, Ca.{" "}
          <span id="header-bold-message">Learn how you can help us right now!</span>
        </span>
      </div>
    </div>
  );
}

export default LoginHeader;

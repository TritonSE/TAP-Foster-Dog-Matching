/**
 * Start Header Component
 *
 * @summary  Reusable header component with the TAP logo and message.
 * @author   Artyom Muradyan
 *
 * May be merged with dashboard header
 */

import React from "react";
import logo from "../images/logo.png";
import "../styles/startheader.css";

function StartHeader() {
  return (
    <div id="header">
      <a href="/" id="header-logo">
        {" "}
        <img src={logo} alt="The Animal Pad" />{" "}
      </a>
      <div id="header-message">
        <span>
          TAP is an all-breed, non-profit Dog Rescue Organization based in San Diego, Ca.{" "}
          <span id="header-bold-message">Learn how you can help us right now!</span>
        </span>
      </div>
    </div>
  );
}

export default StartHeader;

import React from "react";
import logo from "../images/logo.png";
import "../styles/header.css";

function Header() {
  return (
    <div id="header">
      <img id="header-logo" src={logo} alt="The Animal Pad" />
      <div>
        <span id="header-message-text">
          TAP is an all-breed, non-profit Dog Rescue Organization based in San Diego, Ca.{" "}
          <strong>Learn how you can help us right now!</strong>
        </span>
      </div>
    </div>
  );
}

export default Header;

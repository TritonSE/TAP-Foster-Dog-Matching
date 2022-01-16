import React from "react";
import "../styles/header.css";
// TODO Signout button needs to be made functional

function Header(props) {
  return (
    <div id="header">
      <div className="header-welcome">
        Welcome {props.firstName} <br />
        <strong>
          <span id="foster-text">Foster</span>
        </strong>
      </div>
      <div className="header-message">
        <span className="header-message-text">
          TAP is an all-breed, non-profit Dog Rescue Organization based in San Diego, Ca.{" "}
          <strong>Learn how you can help us right now!</strong>
        </span>
      </div>
      <div className="header-sign-out">Sign out</div>
    </div>
  );
}

export default Header;

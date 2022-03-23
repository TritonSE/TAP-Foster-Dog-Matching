/**
 * Header component that includes welcome message, call-to-action message, and sign out button
 * for use on many pages starting with the Dashboard.
 *
 *
 * @summary     Reusable Header component for use on dashboard pages.
 * @author      Andrew Masek
 *
 * #TODO Signout button needs to be made functional
 */

import React from "react";
import "../css/header.css";
import logoImage from "../images/logo1.png";
import hamburgerIcon from "../images/hamburgermenuicon.png";

function Header(props) {
  return (
    <div id="header">
      <div className="header-welcome">
        <img src={logoImage} alt="logo" />
        <div className="header-welcome-text">
          Welcome {props.firstName} <br />
          <strong>
            <span id="foster-text">Foster</span>
          </strong>
        </div>
      </div>
      <div className="header-message">
        <div className="header-message-text">
          TAP is an all-breed, non-profit Dog Rescue Organization based in San Diego, Ca.{" "}
          <strong>Learn how you can help us right now!</strong>
        </div>
      </div>
      <div className="header-sign-out">Sign out</div>
      <div className="navbar-hamburger-button">
        <img src={hamburgerIcon} alt="Mobile menu" />
      </div>
    </div>
  );
}

export default Header;

/**
 * Header component that includes welcome message, call-to-action message, and sign out button
 * for use on many pages starting with the Dashboard.
 *
 *
 * @summary     Reusable Header component for use on dashboard pages.
 * @author      Andrew Masek
 *
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import logoImage from "../images/logo1.png";
import { signOutUser } from "../services/auth";

function Header({ firstName, role }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser();
    navigate("/");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignOut();
    }
  };

  return (
    <div id="header">
      <div className="header-welcome">
        <img src={logoImage} alt="logo" />
        <div className="header-welcome-text">
          Welcome {firstName} <br />
          <strong>
            <span id="foster-text">{role}</span>
          </strong>
        </div>
      </div>
      <div className="header-message">
        <div className="header-message-text">
          TAP is an all-breed, non-profit Dog Rescue Organization based in San Diego, Ca.{" "}
          <strong>Learn how you can help us right now!</strong>
        </div>
      </div>
      <div
        className="header-sign-out"
        onClick={handleSignOut}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        Sign out
      </div>
    </div>
  );
}

export default Header;

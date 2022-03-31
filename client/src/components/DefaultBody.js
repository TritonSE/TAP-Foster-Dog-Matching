/**
 * Body component that includes the navbar and a container for child components.
 *
 * @summary     Body component that includes the navbar and a container for child components.
 * @author      Andrew Masek
 */

import React from "react";
import "../css/defaultbody.css";
import Header from "./Header";
import Navbar from "./Navbar";

function DefaultBody(props) {
  return (
    <div id="default-body-container">
      <Header firstName="Placeholder" />
      <div id="default-body">
        <div id="default-body-navbar">
          <Navbar
            pages={{
              Dashboard: "/dashboard",
              Application: "/application",
              "Contact Us": "/contact",
              "Pending Applications": "/pending-applications",
              "Current Fosters": "/fosters",
              Calendar: "/calendar",
              // NOTE: showing all links for now for dev purposes
              // TODO: only show links depending on current role/status once roles have been implemented
            }}
          />
        </div>
        <div id="default-body-content">{props.children}</div>
      </div>
    </div>
  );
}

export default DefaultBody;

/**
 * Body component that includes the navbar and a container for child components.
 *
 * @summary     Body component that includes the navbar and a container for child components.
 * @author      Andrew Masek
 */

import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../css/defaultbody.css";
import Header from "./Header";
import Navbar from "./Navbar";

function DefaultBody(props) {
  const { currentUser, signedIn } = React.useContext(AuthContext);

  return (
    <div id="default-body-container">
      <Header
        firstName={signedIn ? currentUser.firstName : ""}
        role={
          (signedIn &&
            (currentUser.type === "admin"
              ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
              : "Foster")) ||
          ""
        }
      />
      <div id="default-body">
        <Navbar
          pages={{
            Dashboard: "/dashboard",
            Application: "/application",
            "Contact Us": "/contact",
            "Pending Applications": "/pending-applications",
            "Current Fosters": "/fosters",
            Calendar: "/calendar",
            Profile: "/profile",
            // NOTE: showing all links for now for dev purposes
            // TODO: only show links depending on current role/status once roles have been implemented
          }}
        />
        <div id="default-body-content">{props.children}</div>
      </div>
    </div>
  );
}

export default DefaultBody;

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

const FOSTER_PAGES = {
  Dashboard: "/dashboard",
  "Contact Us": "/contact",
};

const MANAGEMENT_PAGES = {
  "Pending Applications": "/pending-applications",
  Fosters: "/fosters",
  "Manage Dog Profiles": "/manage-dog-profiles",
  Calendar: "/calendar",
  Profile: "/profile",
};

const AMBASSADOR_PAGES = {
  "Pending Applications": "/pending-applications",
  "Current Fosters": "/fosters",
  "Manage Dog Profiles": "/manage-dog-profiles",
  Calendar: "/calendar",
};

const COORDINATOR_PAGES = {
  "My Fosters": "/fosters",
  "Manage Dog Profiles": "/manage-dog-profiles",
  "My Profile": "/profile",
};

function DefaultBody(props) {
  const { currentUser, signedIn } = React.useContext(AuthContext);

  const visiblePages = React.useMemo(() => {
    if (currentUser && currentUser.type === "admin")
      switch (currentUser.role) {
        case "ambassador":
          return AMBASSADOR_PAGES;
        case "coordinator":
          return COORDINATOR_PAGES;
        case "management":
          return MANAGEMENT_PAGES;
      }
    return FOSTER_PAGES;
  }, [currentUser]);

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
        <Navbar pages={visiblePages} />
        <div id="default-body-content">{props.children}</div>
      </div>
    </div>
  );
}

export default DefaultBody;

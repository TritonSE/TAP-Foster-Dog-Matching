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
    <>
      <Header firstName="Placeholder" />
      <div id="default-body">
        <div id="default-body-navbar">
          <Navbar
            pages={{
              "Pending Applications": "/dashboard",
              "Current Fosters": "/fosters",
              Calendar: "/calendar",
              // TODO: change links depending on current role/status
            }}
          />
        </div>
        <div id="default-body-container">{props.children}</div>
      </div>
    </>
  );
}

export default DefaultBody;

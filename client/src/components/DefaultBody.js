import React from "react";
import "../styles/defaultbody.css";
import Navbar from "./Navbar";

function DefaultBody(props) {
  return (
    <div id="default-body">
      <Navbar id="default-body-navbar" />
      <div id="default-body-container">{props.children}</div>
    </div>
  );
}

export default DefaultBody;
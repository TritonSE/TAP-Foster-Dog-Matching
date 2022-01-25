/**
 * Reusable button with an icon image that takes a target for its link and
 * optionally supports absolute offsets to position it if given a
 * relatively positioned parent. Used primarily in DashboardCards.
 *
 *
 * @summary     Reusable Button with an icon image.
 * @author      Andrew Masek
 *
 */

import React from "react";
import background from "../images/greenbutton.png";
import "../styles/iconbutton.css";

function IconButton(props) {
  return (
    <div
      className="icon-button"
      style={
        props.leftOffset || props.topOffset
          ? { left: props.leftOffset, top: props.topOffset, position: "absolute" }
          : {}
      }
    >
      <a href={props.href}>
        <img src={background} alt={props.altText} />
        <img className="icon-button-icon" src={props.icon} alt=" " />
      </a>
    </div>
  );
}

export default IconButton;

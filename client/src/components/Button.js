/**
 * Button Component
 *
 * @summary  Reusable button component with custom styling, content, and link.
 * @author   Artyom Muradyan
 *
 */

import React from "react";
import "../css/button.css";

function Button(props) {
  const border = "button-border button-border-" + props.className;
  const name = "button-name button-name-" + props.className;
  return (
    <a href={props.buttonLink} className={border} style={props.styleBorder}>
      <div className={name}>{props.name}</div>
    </a>
  );
}

export default Button;

import React from "react";
import "../styles/button.css";

function Button(props) {
  const border = "button-border button-border-" + props.class;
  const name = "button-name button-name-" + props.class;
  return (
    <a href={props.buttonLink} className={border} style={props.styleBorder}>
      <div className={name}>{props.name}</div>
    </a>
  );
}

export default Button;

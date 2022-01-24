import React from "react";
import "../styles/button.css";

function Button(props) {
  return (
    <a href={props.buttonLink} className="button-border" style={props.styleBorder}>
      <div className="button-name">{props.name}</div>
    </a>
  );
}

export default Button;

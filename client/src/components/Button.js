import React from "react";
import "../styles/button.css";

function Button(props) {
  return (
    <div className="button-border" style={props.styleBorder}>
      <div className="button-name" style={props.styleText}>
        {props.buttonName}
      </div>
    </div>
  );
}

export default Button;

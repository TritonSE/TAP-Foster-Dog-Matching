import React from "react";
import "../styles/myprofilebutton.css";

function MyProfileButton(props) {
  return (
    <div
      className="myprofile-button"
      role="button"
      tabIndex={-2}
      onClick={props.onClick}
      onKeyDown={props.onClick}
    >
      <div className="myprofile-button-text">{props.buttonText}</div>
      <div className="myprofile-button-image-container">
        <img className="myprofile-button-image" src={props.imagePath} alt={props.imageAltText} />
      </div>
    </div>
  );
}

export default MyProfileButton;

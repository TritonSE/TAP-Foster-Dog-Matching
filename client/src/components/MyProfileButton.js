import React from "react";
import "../styles/myprofilebutton.css";

function MyProfileButton(props) {
  return (
    <a href={props.href}>
      <div className="myprofile-button">
        <div className="myprofile-button-text">{props.buttonText}</div>
        <div className="myprofile-button-image-container">
          <img className="myprofile-button-image" src={props.imagePath} alt=" " />
        </div>
      </div>
    </a>
  );
}

export default MyProfileButton;

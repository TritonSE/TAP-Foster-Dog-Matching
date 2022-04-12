import React from "react";
import "../css/profilecard.css";

// Used in Profile.js to display an individual's profile
function ProfileCard(props) {
  return (
    <div className="profile-card">
      <div className="profile-card-image-container">
        <img className="profile-card-image" src={props.imagePath} alt={props.imageAltText} />
      </div>
      <div className="profile-card-text">
        <div className="profile-card-name" title={props.name}>
          {props.name}
        </div>
        <div className="profile-card-contact-info" title={props.phonenumber}>
          {props.phonenumber}
        </div>{" "}
        <div className="profile-card-contact-info" title={props.email}>
          {props.email}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

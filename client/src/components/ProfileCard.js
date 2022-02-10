import React from "react";
import "../styles/profilecard.css";

function ProfileCard(props) {
  return (
    <div className="profile-card">
      <div className="profile-card-image-container">
        <img className="profile-card-image" src={props.imagePath} alt={props.imageAltText} />
      </div>
      <div className="profile-card-text">
        <div className="profile-card-name">{props.name}</div>
        <div className="profile-card-contact-info">{props.phonenumber}</div>{" "}
        <div className="profile-card-contact-info">{props.email}</div>
      </div>
    </div>
  );
}

export default ProfileCard;

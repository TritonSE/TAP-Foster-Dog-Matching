import React from "react";
import "../styles/profilecard.css";

function ProfileCard(props) {
  return (
    <div className="profile-card">
      <img className="profile-card-image" src={props.imagePath} alt={props.imageAltText} />
      <div className="profile-card-name">{props.name}</div>
      <div className="profile-card-phonenumber">{props.phonenumber}</div>
      <div className="profile-card-email">{props.email}</div>
    </div>
  );
}

export default ProfileCard;

import React from "react";
import "../styles/profilesection.css";

function ProfileSection(props) {
  return (
    <div className="profile-section">
      {props.myProfileButton}
      <div className="profile-section-title">{props.titleText}</div>
      <span className="profile-section-link">
        <a href={props.href}>{props.linkText}</a>
        <div className="profile-section-link-arrow">{props.linkArrow}</div>
      </span>
      <div className="profile-section-divider" />
      <div className="profile-section-cards-container">
        <div className="profile-section-cards-column">
          {props.profileCard}
          {props.profileCard}
        </div>
        <div className="profile-section-cards-column">
          {props.profileCard}
          {props.profileCard}
        </div>
        <div className="profile-section-cards-column">
          {props.profileCard}
          {props.profileCard}
        </div>
        <div className="profile-section-cards-column">
          {props.profileCard}
          {props.profileCard}
        </div>
        <div className="profile-section-cards-column">
          {props.profileCard}
          {props.profileCard}
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;

import React from "react";
import "../styles/profilesection.css";

function ProfileSection(props) {
  const cards = props.profileCards.map((card) => (
    <div className="profile-section-card">{card}</div>
  ));

  return (
    <div className="profile-section">
      {props.myProfileButton}
      <div className="profile-section-title">{props.titleText}</div>
      <span className="profile-section-link">
        <a href={props.href}>{props.linkText}</a>
        <div className="profile-section-link-arrow">{props.linkArrow}</div>
      </span>
      <div className="profile-section-divider" />
      <div className="profile-section-cards-container">{cards}</div>
    </div>
  );
}

export default ProfileSection;

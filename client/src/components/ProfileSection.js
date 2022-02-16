import React, { useState } from "react";
import "../styles/profilesection.css";

function ProfileSection(props) {
  const [viewAll, setViewAll] = useState(false);

  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  const cards = props.profileCards.map((card) => (
    <div className="profile-section-card">{card}</div>
  ));

  return (
    <div className="profile-section">
      {props.myProfileButton}
      <div className="profile-section-title">{props.titleText}</div>
      <span
        className="profile-section-button"
        role="button"
        onClick={toggleViewAll}
        onKeyDown={toggleViewAll}
        tabIndex={0}
      >
        {!viewAll ? props.buttonText : props.buttonAltText}
        <div className="profile-section-button-arrow">{props.buttonArrow}</div>
      </span>
      <div className="profile-section-divider" />
      {!viewAll ? (
        <div className="profile-section-cards-container">{cards}</div>
      ) : (
        <div className="profile-section-cards-container-view-all">{cards}</div>
      )}
    </div>
  );
}

export default ProfileSection;

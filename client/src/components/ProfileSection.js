import React, { useState } from "react";
import "../css/profilesection.css";
import ProfileCard from "./ProfileCard";
import pfp from "../images/pfp.png";

// Used in Profile.js to divide the page into sections based on role
function ProfileSection(props) {
  const [viewAll, setViewAll] = useState(false);

  // Event to change states (viewing less, viewing all) based on showing
  // more or less profile cards
  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  // Maps the array of profiles to individual card objects
  const cards = props.profiles.map((profile) => (
    <div className="profile-section-card">
      <ProfileCard
        imagePath={pfp} // TODO: replace with real profile image after we do image hosting
        name={`${profile.firstName} ${profile.lastName}`}
        phonenumber={profile.phone}
        email={profile.email}
      />
    </div>
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

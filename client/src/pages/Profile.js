import React, { useState } from "react";
import Popup from "../components/Popup";
import ProfileSection from "../components/ProfileSection";
import MyProfileButton from "../components/MyProfileButton";
import DefaultBody from "../components/DefaultBody";
import { DataContext } from "../contexts/DataContext";
import pfp from "../images/pfp.png";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const { allAmbassadors, allCoordinators, allManagement } = React.useContext(DataContext);
  const { currentUser } = React.useContext(AuthContext);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DefaultBody>
      <ProfileSection
        titleText="Management"
        buttonText="View All"
        buttonAltText="View Less"
        buttonArrow="&#8594;"
        profiles={allManagement || []}
        myProfileButton={
          <MyProfileButton
            buttonText="My Profile"
            imagePath={pfp}
            imageAltText="My Profile picture"
            onClick={togglePopup}
          />
        }
      />
      <ProfileSection
        titleText="Ambassadors"
        buttonText="View All"
        buttonAltText="View Less"
        buttonArrow="&#8594;"
        profiles={allAmbassadors || []}
      />
      <ProfileSection
        titleText="Coordinators"
        buttonText="View All"
        buttonAltText="View Less"
        buttonArrow="&#8594;"
        profiles={allCoordinators || []}
      />
      {isOpen && <Popup profile={currentUser} handleClose={togglePopup} />}
    </DefaultBody>
  );
}

export default Profile;

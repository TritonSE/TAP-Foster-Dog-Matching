import React from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileSection from "../components/ProfileSection";
import MyProfileButton from "../components/MyProfileButton";
import pfp from "../images/pfp.png";

function Profile() {
  return (
    <div>
      <ProfileSection
        titleText="Management"
        linkText="View All"
        linkArrow="&#8594;"
        href="Profile/Management"
        profileCard={
          <ProfileCard
            imagePath={pfp}
            name="Clara Adams"
            phonenumber="(917)-392-8936"
            email="Clara@tap.com"
          />
        }
      />
      <MyProfileButton buttonText="My Profile" imagePath={pfp} href="Profile/EditProfile" />
      <ProfileSection
        titleText="Ambassadors"
        linkText="View All"
        linkArrow="&#8594;"
        href="Profile/Ambassadors"
        profileCard={
          <ProfileCard
            imagePath={pfp}
            name="Clara Adams"
            phonenumber="(917)-392-8936"
            email="Clara@tap.com"
          />
        }
      />
      <ProfileSection
        titleText="Coordinators"
        linkText="View All"
        linkArrow="&#8594;"
        href="Profile/Coordinators"
        profileCard={
          <ProfileCard
            imagePath={pfp}
            imageAltText="Profile picture"
            name="Clara Adams"
            phonenumber="(917)-392-8936"
            email="Clara@tap.com"
          />
        }
      />
    </div>
  );
}

export default Profile;

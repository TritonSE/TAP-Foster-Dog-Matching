import React, { useState } from "react";
import Popup from "../components/Popup";
import ProfileCard from "../components/ProfileCard";
import ProfileSection from "../components/ProfileSection";
import MyProfileButton from "../components/MyProfileButton";
import pfp from "../images/pfp.png";
import edit from "../images/edit.png";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "unset" : "hidden";
  };

  const manageProf = [
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
  ];

  const ambassProf = [
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
  ];

  const coordProf = [
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
    <ProfileCard
      imagePath={pfp}
      imageAltText="Profile picture"
      name="Clara Adams"
      phonenumber="(917)-392-8936"
      email="Clara@tap.com"
    />,
  ];

  return (
    <div>
      <ProfileSection
        titleText="Management"
        linkText="View All"
        linkArrow="&#8594;"
        href="Profile/Management"
        profileCards={manageProf}
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
        linkText="View All"
        linkArrow="&#8594;"
        href="Profile/Ambassadors"
        profileCards={ambassProf}
      />
      <ProfileSection
        titleText="Coordinators"
        linkText="View All"
        linkArrow="&#8594;"
        href="Profile/Coordinators"
        profileCards={coordProf}
      />
      {isOpen && (
        <Popup
          section1Name="Role: "
          userRole="Ambassador"
          section2Name="Contact info:"
          contactMethod1="Phone Number:"
          contactMethod2="Email:"
          phone="123-456-7890"
          email="Clara@tap.com"
          changeButtonLabel="Change Password"
          pfpPath={pfp}
          pfpAltText="My Profile picture"
          name="Clara Adams"
          handleClose={togglePopup}
          editProfileButtonLabel="Edit Profile"
          editProfileButtonImage={edit}
          editProfileButtonAltText="Edit Profile picture"
          saveButtonLabel="Save Changes"
          editPfpButtonLabel="Edit"
        />
      )}
    </div>
  );
}

export default Profile;

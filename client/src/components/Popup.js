import React, { useRef, useState, useContext } from "react";
import "../css/popup.css";
import { AuthContext } from "../contexts/AuthContext";
import edit from "../images/edit.png";
import { updateAdmin, updateAdminProfileImage } from "../services/admins";

function formatPhoneNumber(value) {
  // THANKS: https://tomduffytech.com/how-to-format-phone-number-in-react/
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early

  if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

// Used to Profile.js for viewing and editing user's profile
function Popup(props) {
  const [editing, setEditing] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState(props.profile.photoURL);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [phone, setPhone] = useState(props.profile.phone);
  const [email, setEmail] = useState(props.profile.email);
  const [error, setError] = useState();
  const fileInputRef = useRef(null);
  const { refetchCurrentUser } = useContext(AuthContext);

  // Event to change states (not editing, editing) based on whether or not
  // user is editing profile
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    updateAdmin(props.profile._id, { phone, email })
      .then((res) => {
        if (res.ok) {
          setError();
          toggleEditing();
        } else {
          setError(res.data.message);
        }
      })
      .then(() => {
        if (newProfileImage) {
          return updateAdminProfileImage(props.profile._id, newProfileImage);
        }
        return Promise.resolve();
      })
      .then(refetchCurrentUser);
  };

  const openFileUploadDialog = () => {
    fileInputRef.current.click();
  };

  const onFileInputChange = (event) => {
    const file = event.target.files[0];
    setNewProfileImage(file);
    const fileUrl = URL.createObjectURL(file);
    setProfileImageURL(fileUrl);
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span
          className="close-icon"
          role="button"
          tabIndex={0}
          onClick={props.handleClose}
          onKeyDown={props.handleClose}
        >
          ✕
        </span>
        <br />
        <div className="box-section1">
          {!editing ? (
            <div className="pfp-container">
              <img className="pfp" src={profileImageURL} alt="My profile" />
            </div>
          ) : (
            <div className="pfp-container">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileInputChange}
                style={{ display: "none" }}
              />
              <img className="blurred-pfp" src={profileImageURL} alt="My profile" />
              <div
                className="edit-pfp-button"
                onClick={openFileUploadDialog}
                onKeyDown={openFileUploadDialog}
                role="button"
                tabIndex={0}
              >
                <div className="edit-pfp-button-text">Edit</div>
              </div>
            </div>
          )}
          <div className="name-text">
            {props.profile.firstName} {props.profile.lastName}
          </div>
          <div className="box-section1-text">
            <div className="text-bold">Role:</div>
            <div className="text-right">
              <div className="user-info">
                {props.profile.role.charAt(0).toUpperCase()}
                {props.profile.role.slice(1)}
              </div>
            </div>
          </div>
        </div>
        <div className="box-divider" />
        <div className="box-section2">
          <div className="box-section2-text">
            <div className="text-bold">Contact info:</div>
            <br />
            <div className="text-left">
              Phone Number:
              <br />
              Email:
            </div>

            <div className="text-right">
              <input
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                className="user-info-editable"
                disabled={!editing}
              />
              <input
                className="user-info-editable"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editing}
              />
            </div>
          </div>
        </div>
        <div className="box-divider" />
        <div className="box-section3">
          {
            // FIXME: we don't have this lol
            /* {!editing && (
            <div className="change-password-button">
              <div className="change-password-button-text">Change Password</div>
            </div>
          )} */
          }
          {!editing ? (
            <div
              className="edit-profile-button"
              role="button"
              onClick={toggleEditing}
              onKeyDown={toggleEditing}
              tabIndex={0}
            >
              <div className="edit-profile-image-container">
                <img className="edit-profile-image" src={edit} alt="Edit Profile" />
              </div>
              <div className="edit-profile-text">Edit Profile</div>
            </div>
          ) : (
            <div>
              {error && <p className="save-changes-error-message">{error}</p>}
              <div
                className="save-changes-button"
                role="button"
                onClick={handleSave}
                onKeyDown={handleSave}
                tabIndex={0}
              >
                <div className="save-changes-text">Save Changes</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;

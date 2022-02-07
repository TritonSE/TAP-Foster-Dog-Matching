import React, { useState } from "react";
import "../styles/popup.css";

function Popup(props) {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(!editing);
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
        <div className="box-section1">
          {!editing ? (
            <div className="pfp-container">
              <img className="pfp" src={props.pfpPath} alt={props.pfpAltText} />
            </div>
          ) : (
            <div className="pfp-container">
              <img className="blurred-pfp" src={props.pfpPath} alt={props.pfpAltText} />
              <div className="edit-pfp-button">
                <div className="edit-pfp-button-text">{props.editPfpButtonLabel}</div>
              </div>
            </div>
          )}
          <div className="name-text">{props.name}</div>
          <div className="box-section1-text">
            <div className="box-section1-text-bold">{props.section1Name}</div>
            <div className="text-right">
              <div className="user-info">{props.userRole}</div>
            </div>
          </div>
        </div>
        <div className="box-divider" />
        <div className="box-section2">
          <div className="box-section2-text">
            <div className="box-section2-text-bold">{props.section2Name}</div>
            <div className="text-left">
              {props.contactMethod1}
              <br />
              {props.contactMethod2}
            </div>
            {!editing ? (
              <div className="text-right">
                <div className="user-info">{props.phone}</div>
                <div className="user-info">{props.email}</div>
              </div>
            ) : (
              <div className="text-right">
                <div className="user-info-container">
                  <div className="user-info-editable" contentEditable="true">
                    {props.phone}
                  </div>
                </div>
                <div className="user-info-container">
                  <div className="user-info-editable" contentEditable="true">
                    {props.email}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="box-divider" />
        <div className="box-section3">
          {!editing && (
            <div className="change-password-button">
              <div className="change-password-button-text">{props.changeButtonLabel}</div>
            </div>
          )}
          {!editing ? (
            <div
              className="edit-profile-button"
              role="button"
              onClick={toggleEditing}
              onKeyDown={toggleEditing}
              tabIndex={0}
            >
              <div className="edit-profile-image-container">
                <img
                  className="edit-profile-image"
                  src={props.editProfileButtonImage}
                  alt={props.editProfileButtonAltText}
                />
              </div>
              <div className="edit-profile-text">{props.editProfileButtonLabel}</div>
            </div>
          ) : (
            <div
              className="save-changes-button"
              role="button"
              onClick={toggleEditing}
              onKeyDown={toggleEditing}
              tabIndex={0}
            >
              <div className="save-changes-text">{props.saveButtonLabel}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;

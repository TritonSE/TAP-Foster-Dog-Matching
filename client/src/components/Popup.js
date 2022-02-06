import React from "react";
import "../styles/popup.css";

function Popup(props) {
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
          <div className="pfp-container">
            <img className="pfp" src={props.pfpPath} alt={props.pfpAltText} />
          </div>
          <div className="name-text">{props.name}</div>
          <div className="box-section1-text">
            <div className="box-section1-text-bold">{props.section1Name}</div>
            <div className="text-right">{props.userRole}</div>
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
            <div className="text-right">
              {props.phone}
              <br />
              {props.email}
            </div>
          </div>
        </div>
        <div className="box-divider" />
        <div className="box-section3">
          <div className="change-password-button">
            <div className="change-password-button-text">{props.buttonLabel}</div>
          </div>
          <div className="edit-profile-button">
            <div className="edit-profile-image-container">
              <img className="edit-profile-image" src={props.editImage} alt={props.editAltText} />
            </div>
            <div className="edit-profile-text">{props.editText}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;

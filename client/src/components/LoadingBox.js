/**
 * Loading Box Component that is used when applicant/admin is waiting on the other party
 *
 * @summary     Loading Component
 * @author      Jacob Au
 * 
 * Props:
 * -message: message to show the users on next instructions
 * -currentStage: description of current stage that the user is in
 * 
 * Ex)
 *  <LoadingBox
        message= "Waiting for applicant to respond, click on the progress bar to see previous steps"
        currentStage="Applicant is scheduling their interview"
      />
 */

import React from "react";
import loadingDog from "../images/loadingdog.png";
import loadingCircle from "../images/loadingcircle.png";
import "../css/loadingBox.css";

function LoadingBox({ message, currentStage }) {
  return (
    <div className="loading-box-wrapper">

      <div className="loading-image">
        <img src={loadingCircle} alt="loading circle" />
      </div>
      <div >
        <img src={loadingDog} className="dog-image" alt="loading dog" />
      </div>
      <div className="loading-text">
        <p className="waiting-text">{message}</p>
        <p>{"Current Stage: " + currentStage}</p>
      </div>
    </div>
  );
}

export default LoadingBox;

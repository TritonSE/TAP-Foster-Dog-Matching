import React from "react";
import "../styles/meeting.css";

function Meetings(props) {
    return (
      <div className="meeting-card">
        <div className="titleContainer">
            <h3 className="title">{props.title}</h3>
        </div>
        <div className="break"></div>
        <div className="text-card">
            {props.textCard}
        </div>
        <div className="image-card  ">
            <img className="image" src={props.imagePath} alt="not found"></img>
        </div>
      </div>
    );
  }
  
  export default Meetings;
import React from "react";
import "../styles/meeting.css";

function Meetings(props) {
  return (
    <div className="meeting-card">
      <div className="title">{props.title}</div>
      <div className="break" />
      <div className="text-card">{props.textCard}</div>
      <div className="image-card  ">
        <img className="image" src={props.imagePath} alt="not found" />
      </div>
    </div>
  );
}

export default Meetings;

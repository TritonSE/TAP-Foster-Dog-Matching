import React from "react";
import "../styles/meeting.css";

function Meetings(props) {
  if (props.status) {
    return (
      <div className="meeting-card">
        <div className="title">{props.title}</div>
        <div className="break" />
        <div className="text-card">{props.textCard}</div>
        <div className="image-card">
          {/* <img className="image" src={props.imagePath} alt="" /> */}
          <div className="status">{props.status}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="meeting-card">
      <div className="title">
        <h2>{props.title}</h2>
      </div>
      <div className="break" />
      <div className="text-card">{props.textCard}</div>
      <div className="image-card">
        <img className="image" src={props.imagePath} alt="" />
        {/* <div className="status">{props.status}</div> */}
      </div>
    </div>
  );
}

export default Meetings;

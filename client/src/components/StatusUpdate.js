import React from "react";
import "../styles/status.css";

function Meetings(props) {
  return (
    <div className="status-card">
      <div className="card-itle">
        <h3>{props.title}</h3>
      </div>
      <div className="information-grid">
        <div className="box-ambassador">Ambassador:</div>
        <div className="box-ambassador">{props.ambassador}</div>
        <div className="line1">
          <hr className="line" />
        </div>
        <div className="box-contact">Contact Info:</div>
        <div className="box-contact">{props.phone}</div>
        <div className="box-email">{props.email}</div>
        <div className="line2">
          <hr className="line" />
        </div>
        <div className="box-date">Interview Date:</div>
        <div className="box-date">{props.date}</div>
        <div className="line3">
          <hr className="line" />
        </div>
        <div className="box-time">Interview Time:</div>
        <div className="box-time">{props.time}</div>
        <div className="line4">
          <hr className="line" />
        </div>
        <div className="box-location">Interview Location:</div>
        <div className="box-location">{props.location}</div>
      </div>
    </div>
  );
}

export default Meetings;
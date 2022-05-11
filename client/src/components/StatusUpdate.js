import React from "react";
import "../css/status.css";

/**
 * This component is to be used in conjunction with the meeting component to show
 * the status of an upcoming meeting/appointment
 *
 * props - title, image (pfp), ambassador, phone, email, date, time, location
 *
 * Example:
 * <StatusUpdate
 *          title="Interview Info"
 *          ambassador="Dhanush"
 *          phone="123-456-7890"
 *          email="test@tap.com"
 *          date="1/1/2022"
 *          time="6-7:00PM"
 *          location="Zoom"
 *          image={pfp}
 *        />
 *
 */

function StatusUpdate(props) {
  return (
    <div className="status-card">
      <div className="card-title">
        <h3>{props.title}</h3>
      </div>
      <div className="information-grid">
        <div className="box-ambassador">
          <div className="ambassador-left">Ambassador:</div>
        </div>
        <div className="box-ambassador">
          <img className="pfp" src={props.image} alt="" />
          <div className="ambassador-right">{props.ambassador}</div>
        </div>
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

export default StatusUpdate;

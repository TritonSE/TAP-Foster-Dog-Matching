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

function StatusItem({ label, content, noLine }) {
  return (
    <>
      <div className="information-box-item">
        <div className="information-box-item-label">{label}</div>
        <div className="information-box-item-content">{content}</div>
      </div>
      {!noLine && <hr className="line" />}
    </>
  );
}

function StatusUpdate(props) {
  return (
    <div className="status-card">
      <div className="card-title">
        <h3>{props.title}</h3>
      </div>
      <div className="information-box">
        <StatusItem
          label="Ambassador:"
          content={
            <div className="box-ambassador">
              <img className="pfp" src={props.image} alt="" />
              <div className="ambassador-right">{props.ambassador}</div>
            </div>
          }
        />
        <StatusItem
          label="Contact Info:"
          content={
            <>
              <span>{props.phone}</span>
              <span>{props.email}</span>
            </>
          }
        />
        {props.date && <StatusItem label="Date:" content={props.date} />}
        {props.time && <StatusItem label="Time:" content={props.time} />}
        {props.location && <StatusItem label="Location:" content={props.location} noLine />}
        {props.tapFacilityLocation && (
          <StatusItem label="TAP Facility Location:" content={props.tapFacilityLocation} noLine />
        )}
      </div>
    </div>
  );
}

export default StatusUpdate;

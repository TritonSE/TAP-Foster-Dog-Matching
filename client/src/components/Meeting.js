import React from "react";
import "../css/meeting.css";
/**
 * Meeting component that has 2 main props, the textCard and status/imagePath. textCard
 * is a div container, which holds html that will compose the left, text side of the meeting component.
 * The other prop is either status, which is a statusUpdate component if you want to display a status update or the
 * path to an image if you want to display an image on the right side of the component
 *
 * Example:
 *  <Meeting
 *      title="Interview Confirmed"
 *       textCard={
 *        <div>
 *          <p>Hello Bob</p>
 *          <p>Congratulations on confirming your first interview. That is pogpilled and based.</p>
 *          <p>The Animal Pad Team</p>
 *        </div>
 *      }
 *      status={
 *        <StatusUpdate
 *          title="Interview Info"
 *          ambassador="Dhanush"
 *          phone="123-456-7890"
 *          email="test@tap.com"
 *          date="1/1/2022"
 *          time="6-7:00PM"
 *          location="Zoom"
 *          image={pfp}
 *        />
 *      }
 *    />
 *
 */

function Meetings(props) {
  return (
    <div className="meeting-card">
      <div className="title">
        <h2>{props.title}</h2>
      </div>
      <div className="meeting-card-content">
        {props.textCard && (
           <div className="text-card">{props.textCard}</div>
        )}
        {props.status && (
          <div className="image-card">
            <div className="status">{props.status}</div>
          </div>
        )}
         {props.interviewInfo && (
          <div className="image-card">
            <div className="status">{props.interviewInfo}</div>
          </div>
        )}
        {props.imagePath && (
          <div className="image-card">
            <img className="image" src={props.imagePath} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Meetings;

import React, { useState } from "react";
import "../css/meetingscheduling.css";

function MeetingSchedulingMeetTimesContainer(props) {
  const [time, setTime] = useState("none");

  const meetTimes = props.meetTimes.map((meetTime) => (
    <div key={meetTime}>
      {time === meetTime ? (
        <button
          className={
            Math.ceil(
              (new Date(props.date.getFullYear(), props.date.getMonth(), 1).getDay() +
                new Date(props.date.getFullYear(), props.date.getMonth() + 1, 0).getDate()) /
                7
            ) <= 5
              ? "meeting-scheduling-meeting-time-selected"
              : "meeting-scheduling-meeting-time-selected-six-weeks"
          }
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            props.interviewSlotSelectedCallback(time);
          }}
        >
          <div className="meeting-scheduling-meeting-time-selected-text-container">
            <div className="meeting-scheduling-meeting-time-selected-text">Choose</div>
          </div>
        </button>
      ) : (
        <button
          className={
            Math.ceil(
              (new Date(props.date.getFullYear(), props.date.getMonth(), 1).getDay() +
                new Date(props.date.getFullYear(), props.date.getMonth() + 1, 0).getDate()) /
                7
            ) <= 5
              ? "meeting-scheduling-meeting-time"
              : "meeting-scheduling-meeting-time-six-weeks"
          }
          type="button"
          onClick={() => setTime(meetTime)}
        >
          <div className="meeting-scheduling-meeting-time-text">{meetTime}</div>
        </button>
      )}
    </div>
  ));

  return (
    <div
      className={
        Math.ceil(
          (new Date(props.date.getFullYear(), props.date.getMonth(), 1).getDay() +
            new Date(props.date.getFullYear(), props.date.getMonth() + 1, 0).getDate()) /
            7
        ) <= 5
          ? "meeting-scheduling-meeting-times-container"
          : "meeting-scheduling-meeting-times-container-six-weeks"
      }
    >
      {meetTimes.length === 0 ? "No more times avaliable on this day" : meetTimes}
    </div>
  );
}

export default MeetingSchedulingMeetTimesContainer;

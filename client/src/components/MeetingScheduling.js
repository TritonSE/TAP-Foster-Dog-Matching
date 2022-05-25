/**
 * Meeting Scheduling Component
 *
 * Component for scheduling meetings on steps 2 and 4 of Foster View
 *
 * Used on: Applications
 *
 * Props:
 * - title [string] - string to be displayed as title of this component
 * - times [string[]] - array of strings of avaliable times to meet
 *
 * Example usage:
 *   <MeetingScheduling
 *     title="Interview Scheduling"
 *     times={[
 *       "11:00 AM",
 *       "11:30 AM",
 *  	 "12:00 PM",
 *  	 "12:30 PM",
 *  	 "1:00 PM",
 *  	 "5:00 PM",
 *  	 "5:30 PM",
 *  	 "6:00 PM",
 *  	 "6:30 PM",
 *  	 "7:00 PM",
 *     ]}
 *   />
 */

import React, { useState } from "react";
import Calendar from "react-calendar";
import left from "../images/left.svg";
import right from "../images/right.svg";
import "../css/calendar.css";
import "../css/meetingscheduling.css";

function MeetingScheduling(props) {
  const [date, onChange] = useState(new Date());
  const [time, setTime] = useState("none");

  const weekday = [
    "Sunday,",
    "Monday,",
    "Tuesday,",
    "Wednesday,",
    "Thursday,",
    "Friday,",
    "Saturday,",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const times = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
  ];

  const meetTimes = times.map((meetTime) => (
    <div>
      {time === meetTime ? (
        <button
          className={
            Math.ceil(
              (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
                new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
                7
            ) <= 5
              ? "meeting-scheduling-meeting-time-selected"
              : "meeting-scheduling-meeting-time-selected-six-weeks"
          }
          type="button"
        >
          <div className="meeting-scheduling-meeting-time-selected-text-container">
            <div className="meeting-scheduling-meeting-time-selected-text">Choose</div>
          </div>
        </button>
      ) : (
        <button
          className={
            Math.ceil(
              (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
                new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
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
          (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
            new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
            7
        ) <= 5
          ? "meeting-scheduling-container"
          : "meeting-scheduling-container-six-weeks"
      }
    >
      <div className="meeting-scheduling-container-text">{props.title}</div>
      <div
        className={
          Math.ceil(
            (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
              new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
              7
          ) <= 5
            ? "meeting-scheduling-calendar-box"
            : "meeting-scheduling-calendar-box-six-weeks"
        }
      >
        <Calendar
          onChange={onChange}
          value={date}
          minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
          maxDate={
            new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())
          }
          calendarType="US"
          minDetail="month"
          prevLabel={<img className="meeting-scheduling-left-arrow" src={left} alt="left arrow" />}
          nextLabel={
            <img className="meeting-scheduling-right-arrow" src={right} alt="right arrow" />
          }
          showNeighboringMonth
          formatMonthYear={(locale, currDate) => month[currDate.getMonth()]}
          onClickDay={() => setTime("none")}
          onActiveStartDateChange={({ activeStartDate }) => {
            onChange(
              new Date().getMonth() === activeStartDate.getMonth() ? new Date() : activeStartDate
            );
            setTime("none");
          }}
        />
      </div>
      <div
        className={
          Math.ceil(
            (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
              new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
              7
          ) <= 5
            ? "meeting-scheduling-times-box"
            : "meeting-scheduling-times-box-six-weeks"
        }
      >
        <div className="meeting-scheduling-times-box-title">Times Avaliable</div>
        <div className="meeting-scheduling-times-box-description">
          Slots will take about 30 minutes
        </div>
        <div className="meeting-scheduling-date">
          {[weekday[date.getDay()], month[date.getMonth()], date.getDate()].join(" ")}
        </div>
        <div
          className={
            Math.ceil(
              (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
                new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
                7
            ) <= 5
              ? "meeting-scheduling-meeting-times-container"
              : "meeting-scheduling-meeting-times-container-six-weeks"
          }
        >
          {meetTimes}
        </div>
      </div>
    </div>
  );
}

export default MeetingScheduling;

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

  const meetTimes = props.times.map((meetTime) => (
    <div>
      {time === meetTime ? (
        <button
          className={
            Math.ceil(
              (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
                new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
                7
            ) <= 5
              ? "meeting-time-selected"
              : "meeting-time-selected-six-weeks"
          }
          type="button"
        >
          <div className="meeting-time-selected-text-container">
            <div className="meeting-time-selected-text">Choose</div>
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
              ? "meeting-time"
              : "meeting-time-six-weeks"
          }
          type="button"
          onClick={() => setTime(meetTime)}
        >
          <div className="meeting-time-text">{meetTime}</div>
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
          ? "container"
          : "container-six-weeks"
      }
    >
      <div className="container-text">{props.title}</div>
      <div
        className={
          Math.ceil(
            (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
              new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
              7
          ) <= 5
            ? "calendar-box"
            : "calendar-box-six-weeks"
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
          prevLabel={<img className="left-arrow" src={left} alt="left arrow" />}
          nextLabel={<img className="right-arrow" src={right} alt="right arrow" />}
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
            ? "times-box"
            : "times-box-six-weeks"
        }
      >
        <div className="times-box-title">Times Avaliable</div>
        <div className="times-box-description">Slots will take about 30 minutes</div>
        <div className="date">
          {[weekday[date.getDay()], month[date.getMonth()], date.getDate()].join(" ")}
        </div>
        <div
          className={
            Math.ceil(
              (new Date(date.getFullYear(), date.getMonth(), 1).getDay() +
                new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) /
                7
            ) <= 5
              ? "meeting-times-container"
              : "meeting-times-container-six-weeks"
          }
        >
          {meetTimes}
        </div>
      </div>
    </div>
  );
}

export default MeetingScheduling;

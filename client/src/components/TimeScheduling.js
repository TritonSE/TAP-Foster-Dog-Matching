import React, { useState } from "react";
import Calendar from "react-calendar";
import DayScheduling from "./DayScheduling";
import left from "../images/left.svg";
import right from "../images/right.svg";
import plus from "../images/plus.png";
import "../css/calendar.css";
import "../css/timescheduling.css";

function dateToHumanFormat(date) {
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

function sortSchedulesByLastName(schedules) {
  schedules.sort((a, b) =>
    a.name.split(" ").pop().localeCompare(b.name.split(" ").pop())
      ? a.name.split(" ").pop().localeCompare(b.name.split(" ").pop())
      : a.name.split(" ").shift().localeCompare(b.name.split(" ").shift())
  );
}

function TimeScheduling(props) {
  const [currDate, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const day = ["Sunday,", "Monday,", "Tuesday,", "Wednesday,", "Thursday,", "Friday,", "Saturday,"];
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

  sortSchedulesByLastName(props.schedules);
  const schedules = props.schedules.map((schedule) => (
    <div key={schedule._id}>
      {dateToHumanFormat(currDate) === schedule.date && (
        <>
          <div className="schedule-entry">
            <div className="schedule-name-text">{schedule.name}</div>
            <div className="schedule-role-text">{schedule.role}</div>
            <div className="schedule-time-text">Times available: {schedule.time.join(", ")}</div>
          </div>
          <div className="schedule-divider" />
        </>
      )}
    </div>
  ));

  const dates = props.schedules.map((schedule) => schedule.date);
  const [datesWithSchedules] = useState(new Set(dates));

  const dayAbbr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const schedulerByDay = dayAbbr.map((d) => <DayScheduling day={d} key={d} />);

  return (
    <>
      <div className="container">
        <div className="container-text">Calendar</div>
        <div
          className="add-button"
          role="button"
          tabIndex={0}
          onClick={togglePopup}
          onKeyDown={togglePopup}
        >
          <div className="add-button-icon-background">
            <img className="add-button-icon" src={plus} alt="Add Button Icon" />
          </div>
          <div className="add-button-text">Add your Calendar</div>
        </div>
        <div className="calendar-box">
          <Calendar
            onChange={onChange}
            value={currDate}
            minDate={
              new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            }
            maxDate={
              new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())
            }
            calendarType="US"
            minDetail="month"
            prevLabel={<img className="left-arrow" src={left} alt="left arrow" />}
            nextLabel={<img className="right-arrow" src={right} alt="right arrow" />}
            showNeighboringMonth={false}
            formatMonthYear={(locale, currentDate) => month[currentDate.getMonth()]}
            tileDisabled={({ date }) => !datesWithSchedules.has(dateToHumanFormat(date))}
          />
        </div>
        <div className="schedules-box">
          <div className="schedules-box-section1">
            <div className="schedules-box-title">Times Avaliable</div>
            <div className="date">
              {[day[currDate.getDay()], month[currDate.getMonth()], currDate.getDate()].join(" ")}
            </div>
          </div>
          <div className="schedules-box-section2">{schedules}</div>
        </div>
      </div>
      {isOpen && (
        <div className="schedule-adder-transparent">
          <div className="schedule-adder">
            <span
              className="close-icon"
              role="button"
              tabIndex={0}
              onClick={togglePopup}
              onKeyDown={togglePopup}
            >
              ✕
            </span>
            <div className="popup-text">Please set your weekly schedule below:</div>
            <label className="repeat-switch" htmlFor="temp-id">
              <input type="checkbox" id="temp-id" />
              <span className="repeat-slider" />
            </label>
            <div className="repeat-text">Repeat?</div>
            <div className="weekly-schedule-container">{schedulerByDay}</div>
            <div className="save-button">
              <div
                className="save-button-text"
                role="button"
                tabIndex={0}
                onClick={togglePopup}
                onKeyDown={togglePopup}
              >
                Save Changes
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default TimeScheduling;

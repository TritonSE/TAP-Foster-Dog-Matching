/**
 * Time Scheduling Component
 *
 * Component for adding and viewing weekly schedules on the Calendar page
 *
 * Used on: Calendar
 *
 * Props:
 * - schedules - list of objects with an _id, name, role, date, and time
 * - times [string[]] - array of strings of avaliable times to meet
 *
 * Example usage:
      <TimeScheduling
        schedules={[
          {
            _id: "1",
            name: "Sam A.",
            role: "Foster Ambassador",
            date: "6/30/2022",
            time: ["5-8 pm", "4-3 pm"],
          },
          {
            _id: "2",
            name: "Clara A.",
            role: "Foster Ambassador",
            date: "6/30/2022",
            time: ["1-2 pm"],
          }
        ]}
      />
 */

import React, { useState } from "react";
import Calendar from "react-calendar";
import { nanoid } from "nanoid";
import DayScheduling from "./DayScheduling";
import left from "../images/left.svg";
import right from "../images/right.svg";
import plus from "../images/plus.png";
import "../css/calendar.css";
import "../css/timescheduling.css";
import { AuthContext } from "../contexts/AuthContext";
import { updateAdmin } from "../services/admins";
import { DataContext } from "../contexts/DataContext";

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
const dayAbbr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function TimeScheduling(props) {
  const [currDate, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [adminSchedule, setAdminSchedule] = useState({});
  const [saveError, setSaveError] = useState();
  const { currentUser } = React.useContext(AuthContext);
  const { refetchData } = React.useContext(DataContext);

  React.useEffect(() => {
    // Load existing admin schedule
    const { schedule } = currentUser;
    if (!schedule) {
      setAdminSchedule(Object.fromEntries(dayAbbr.map((day) => [day, []])));
      return;
    }
    const transformedSchedule = {};
    Object.keys(schedule).forEach((day) => {
      transformedSchedule[day] = schedule[day].map((time) => {
        const [begin, end] = time.split("-");
        return {
          key: nanoid(),
          begin,
          end,
        };
      });
    });
    setAdminSchedule(transformedSchedule);
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleOnChange = (value) => {
    setAdminSchedule(value);
    setSaveError(); // Clear error message
  };

  const handleSave = () => {
    // Check if schedule is valid
    const allTimes = Object.values(adminSchedule).flat();

    if (allTimes.some((time) => !("begin" in time) || !("end" in time))) {
      setSaveError("Make sure all time slots have a start and end time.");
      return;
    }

    const schedule = {};
    Object.keys(adminSchedule).forEach((day) => {
      schedule[day] = adminSchedule[day].map((time) => `${time.begin}-${time.end}`);
    });

    const updatedAdmin = {
      ...currentUser,
      schedule,
    };
    updateAdmin(currentUser._id, updatedAdmin).then(() => {
      refetchData();
      togglePopup();
    });
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
          <div className="time-scheduling-schedule-entry">
            <div className="time-scheduling-schedule-name-text">{schedule.name}</div>
            <div className="time-scheduling-schedule-role-text">{schedule.role}</div>
            <div className="time-scheduling-schedule-time-text">
              Times available: {schedule.time.join(", ")}
            </div>
          </div>
          <div className="time-scheduling-schedule-divider" />
        </>
      )}
    </div>
  ));

  const [datesWithSchedules, setDatesWithSchedules] = useState(new Set());

  React.useEffect(() => {
    setDatesWithSchedules(new Set(props.schedules.map((schedule) => schedule.date)));
  }, [props.schedules]);

  const schedulerByDay = dayAbbr.map((d) => (
    <DayScheduling day={d} key={d} value={adminSchedule} onChange={handleOnChange} />
  ));

  return (
    <>
      <div className="time-scheduling-container">
        <div className="time-scheduling-container-text">Calendar</div>
        <div
          className="time-scheduling-add-button"
          role="button"
          tabIndex={0}
          onClick={togglePopup}
          onKeyDown={togglePopup}
        >
          <div className="time-scheduling-add-button-icon-background">
            <img className="time-scheduling-add-button-icon" src={plus} alt="Add Button Icon" />
          </div>
          <div className="time-scheduling-add-button-text">Add your Calendar</div>
        </div>
        <div className="time-scheduling-calendar-box">
          <Calendar
            onChange={onChange}
            value={currDate}
            minDate={
              new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            }
            maxDate={
              new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate())
            }
            calendarType="US"
            minDetail="month"
            prevLabel={<img className="left-arrow" src={left} alt="left arrow" />}
            nextLabel={<img className="right-arrow" src={right} alt="right arrow" />}
            formatMonthYear={(locale, currentDate) => month[currentDate.getMonth()]}
            tileDisabled={({ date }) => !datesWithSchedules.has(dateToHumanFormat(date))}
          />
        </div>
        <div className="time-scheduling-schedules-box">
          <div className="time-scheduling-schedules-box-section1">
            <div className="time-scheduling-schedules-box-title">Schedules</div>
            <div className="time-scheduling-date">
              {[day[currDate.getDay()], month[currDate.getMonth()], currDate.getDate()].join(" ")}
            </div>
          </div>
          <div className="time-scheduling-schedules-box-section2">{schedules}</div>
        </div>
      </div>
      {isOpen && (
        <div className="time-scheduling-schedule-adder-transparent">
          <div className="time-scheduling-schedule-adder">
            <span
              className="time-scheduling-close-icon"
              role="button"
              tabIndex={0}
              onClick={togglePopup}
              onKeyDown={togglePopup}
            >
              ✕
            </span>
            <div className="time-scheduling-popup-text">Please set your weekly schedule below:</div>
            <label className="time-scheduling-repeat-switch" htmlFor="temp-id">
              <input type="checkbox" id="temp-id" />
              <span className="time-scheduling-repeat-slider" />
            </label>
            <div className="time-scheduling-repeat-text">Repeat?</div>
            <div className="time-scheduling-weekly-schedule-container">{schedulerByDay}</div>
            <div className="time-scheduling-save-error-text">{saveError}</div>
            <div className="time-scheduling-save-button">
              <div
                className="time-scheduling-save-button-text"
                role="button"
                tabIndex={0}
                onClick={handleSave}
                onKeyDown={handleSave}
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

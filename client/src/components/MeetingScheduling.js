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
 *     stage="Initial Interview"
 *   />
 */

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import MeetingSchedulingMeetTimesContainer from "./MeetingSchedulingMeetTimesContainer";
import left from "../images/left.svg";
import right from "../images/right.svg";
import { AuthContext } from "../contexts/AuthContext";
import ApplicationContext from "../contexts/ApplicationContext";

import "../css/calendar.css";
import "../css/meetingscheduling.css";

import { getAdmin } from "../services/admins";
import { getInterviews, createInterview } from "../services/interviews";

function getWeekdayKey(date) {
  switch (date.getDay()) {
    case 0:
      return "SUN";
    case 1:
      return "MON";
    case 2:
      return "TUE";
    case 3:
      return "WED";
    case 4:
      return "THU";
    case 5:
      return "FRI";
    case 6:
      return "SAT";
  }
  return "";
}

/**
 * Takes a Date Object and returns a human-readable date string
 *
 * @param {Date} date - the date object to convert
 * @return {string} - the date in the format MM/DD/YYYY
 */
function dateToHumanFormat(date) {
  const DD = date.getDate() >= 10 ? "" + date.getDate() : "0" + date.getDate();
  const monthInt = date.getMonth() + 1;
  const MM = monthInt >= 10 ? "" + monthInt : "0" + monthInt;
  return MM + "/" + DD + "/" + date.getFullYear();
}

/**
 * Checks if the meeting time has not happened yet (i.e. the time is sometime in the future)
 *
 * @param {string} meetTime - The meeting time in the format HH:MM[ap]m
 * @param {Date} selectedDate - The date of the meeting time
 * @return {boolean} - True if the meeting time has already occurred, false if not
 */
function timeEarlierThanNow(meetTime, selectedDate) {
  const isPM = meetTime.charAt(5) === "p";
  const hour = parseInt(meetTime.slice(0, 2), 10) + (isPM ? 12 : 0);
  const minute = parseInt(meetTime.slice(3, 5), 10);

  const selected = new Date(selectedDate);
  selected.setHours(hour);
  selected.setMinutes(minute);
  selected.setSeconds(0);
  const now = new Date();
  return selected.getTime() <= now.getTime();
}

function MeetingScheduling(props) {
  const [date, onChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = React.useContext(AuthContext);
  const { applicationState } = React.useContext(ApplicationContext);
  const [ambassador, setAmbassador] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  React.useEffect(() => {
    getAdmin(applicationState.ambassador).then((response) => {
      if (response.ok) {
        setAmbassador(response.data.admin);
      }
    });
  }, [applicationState]);

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

  const createNewInterview = (time) => {
    const reqBody = {
      user: currentUser._id,
      ambassador: applicationState.ambassador,
      date: dateToHumanFormat(date),
      time,
      location: "[TBD]",
      internalNotes: "",
      stage: props.stage,
    };

    createInterview(reqBody).then((response) => {
      if (response.ok) props.interviewConfirmedCallback(response.data.interview._id);
      else console.error(response.body);
    });
  };

  const setInterviewSlotSelected = React.useCallback((time) => createNewInterview(time));

  const updateMeetTimes = (interviews) => {
    if (!ambassador) {
      setAvailableTimes([]);
      return;
    }
    const schedule = ambassador.schedule;
    if (!schedule) {
      setAvailableTimes([]);
      return;
    }
    const theWeekday = getWeekdayKey(date);
    const times = schedule[theWeekday];
    // remove time slots that have already passed
    for (let i = 0; i < times.length; i++) {
      if (timeEarlierThanNow(times[i], date)) {
        times.splice(i, 1);
        i--;
      }
    }
    // remove time slots that are taken by other interviews
    // eslint-disable-next-line no-restricted-syntax
    for (const interview of interviews) {
      for (let i = 0; i < times.length; i++) {
        if (times[i] === interview.time) {
          times.splice(i, 1);
          i--;
        }
      }
    }
    setAvailableTimes(times);
  };

  useEffect(() => {
    setIsLoading(true);
    // get interviews from backend
    getInterviews(dateToHumanFormat(date)).then((response) => {
      updateMeetTimes(response.data.interviews);
      setIsLoading(false);
    });
  }, [date]);

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
          onActiveStartDateChange={({ activeStartDate }) => {
            onChange(
              new Date().getMonth() === activeStartDate.getMonth() ? new Date() : activeStartDate
            );
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
        <div className="meeting-scheduling-times-box-title">Times Available</div>
        <div className="meeting-scheduling-times-box-description">
          Slots will take about 30 minutes
        </div>
        <div className="meeting-scheduling-date">
          {[weekday[date.getDay()], month[date.getMonth()], date.getDate()].join(" ")}
        </div>

        {!isLoading && (
          <MeetingSchedulingMeetTimesContainer
            date={date}
            meetTimes={availableTimes}
            interviewSlotSelectedCallback={setInterviewSlotSelected}
          />
        )}
      </div>
    </div>
  );
}

export default MeetingScheduling;

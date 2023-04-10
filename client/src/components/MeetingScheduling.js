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
 *     times={[
 *       "11:00 AM",
 *       "11:30 AM",
 *  	   "12:00 PM",
 *  	   "12:30 PM",
 *  	   "1:00 PM",
 *  	   "5:00 PM",
 *  	   "5:30 PM",
 *  	   "6:00 PM",
 *  	   "6:30 PM",
 *  	   "7:00 PM",
 *     ]}
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

import { getInterviews, createInterview } from "../services/interviews";

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
 * Takes a starting time of a meeting and creates a corresponding time slot.
 *
 * @param {string} time - The time in the format HH:MM [AaPp][Mm]
 * @return {string} - The time slot, assuming 30 minutes long, in the format HH:MM - HH:MM [AaPp][Mm]
 */
function timeToHumanFormat(time) {
  const index = time.indexOf(":");
  const index2 = time.indexOf(" ");
  const time1 = time.substring(0, index2);

  const d = new Date();
  d.setHours(time.substring(0, index));
  d.setMinutes(time.substring(index + 1, index2));
  if (
    (time.substring(index2 + 1, time.length).localeCompare("PM") === 0 ||
      time.substring(index2 + 1, time.length).localeCompare("pm") === 0) &&
    d.getHours() < 12
  )
    d.setHours(d.getHours() + 12);
  d.setSeconds("00");
  d.setMinutes(d.getMinutes() + 30);
  let time2Hours = d.getHours();
  let time2Minutes = d.getMinutes();
  const ampm = time2Hours >= 12 ? "PM" : "AM";
  time2Hours %= 12;
  time2Hours = time2Hours || 12; // the hour '0' should be '12'
  time2Minutes = time2Minutes < 10 ? "0" + time2Minutes : time2Minutes;
  const time2 = time2Hours + ":" + time2Minutes + ampm;

  return time1 + " - " + time2;
}

/**
 * Checks if a meeting time is within a time range.
 *
 * @param {string} meetTime - The meeting time in the format HH:MM [AaPp][Mm]
 * @param {string} timeRange - The time range the format HH:MM - HH:MM [AaPp][Mm]
 * @return {boolean} - True if the meetTime is within the timeRange, false if not
 */
function timeInTimeRange(meetTime, timeRange) {
  // Account for AM/PM wrap-around
  if (
    parseInt(meetTime.split(" ")[0].split(":")[0], 10) === 11 &&
    parseInt(meetTime.split(" ")[0].split(":")[1], 10) >= 30
  )
    return (
      meetTime.split(" ")[0].localeCompare(timeRange.split(" ")[0]) === 0 &&
      meetTime
        .split(" ")[1]
        .toLowerCase()
        .localeCompare(
          timeRange.substring(timeRange.length - 2, timeRange.length).toLowerCase()
        ) !== 0
    );

  return (
    meetTime
      .split(" ")
      .join("")
      .toLowerCase()
      .localeCompare(
        (
          timeRange.split(" ")[0] + timeRange.substring(timeRange.length - 2, timeRange.length)
        ).toLowerCase()
      ) === 0
  );
}

/**
 * Checks if the meeting time has not happened yet (i.e. the time is sometime in the future)
 *
 * @param {string} meetTime - The meeting time in the format HH:MM [AaPp][Mm]
 * @param {Date} selectedDate - The date of the meeting time
 * @return {boolean} - True if the meeting time has already occurred, false if not
 */
function timeEarlierThanNow(meetTime, selectedDate) {
  const index = meetTime.indexOf(":");
  const index2 = meetTime.indexOf(" ");

  const d1 = new Date(selectedDate);
  d1.setHours(meetTime.substring(0, index));
  d1.setMinutes(meetTime.substring(index + 1, index2));
  if (
    (meetTime.substring(index2 + 1, meetTime.length).localeCompare("PM") === 0 ||
      meetTime.substring(index2 + 1, meetTime.length).localeCompare("pm") === 0) &&
    d1.getHours() < 12
  )
    d1.setHours(d1.getHours() + 12);
  d1.setSeconds("00");

  const d2 = new Date();
  return d1.getTime() <= d2.getTime();
}

function MeetingScheduling(props) {
  const [date, onChange] = useState(new Date());
  const [meetTimesContainer, setMeetTimesContainer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = React.useContext(AuthContext);
  const { applicationState } = React.useContext(ApplicationContext);

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
      time: timeToHumanFormat(time),
      location: "[TBD]", // TODO: figure out later
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
    const meetTimesTemp = [...props.times];
    props.times.map((meetTime) => {
      interviews.map((interview) => {
        // Remove timeslots that already have an interview scheduled during them
        if (meetTimesTemp.includes(meetTime) && timeInTimeRange(meetTime, interview.time)) {
          meetTimesTemp.splice(meetTimesTemp.indexOf(meetTime), 1);
        }
        return interview;
      });
      // Remove timeslots that have already passed (i.e. the user has selected the current day)
      if (meetTimesTemp.includes(meetTime) && timeEarlierThanNow(meetTime, date))
        meetTimesTemp.splice(meetTimesTemp.indexOf(meetTime), 1);
      return meetTime;
    });

    setMeetTimesContainer(
      <MeetingSchedulingMeetTimesContainer
        date={date}
        meetTimes={meetTimesTemp}
        interviewSlotSelectedCallback={setInterviewSlotSelected}
      />
    );
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
        <div className="meeting-scheduling-times-box-title">Times Avaliable</div>
        <div className="meeting-scheduling-times-box-description">
          Slots will take about 30 minutes
        </div>
        <div className="meeting-scheduling-date">
          {[weekday[date.getDay()], month[date.getMonth()], date.getDate()].join(" ")}
        </div>

        {!isLoading && meetTimesContainer}
      </div>
    </div>
  );
}

export default MeetingScheduling;

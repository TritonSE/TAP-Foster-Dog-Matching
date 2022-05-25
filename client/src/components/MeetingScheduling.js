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
import "../css/calendar.css";
import "../css/meetingscheduling.css";

// Returns a date string in the format MM/DD/YYYY
function dateToHumanFormat(date) {
  const DD = date.getDate() >= 10 ? "" + date.getDate() : "0" + date.getDate();
  const monthInt = date.getMonth() + 1;
  const MM = monthInt >= 10 ? "" + monthInt : "0" + monthInt;
  return MM + "/" + DD + "/" + date.getFullYear();
}

// Given time is in the format HH:MM [AaPp][Mm], returns
// a time string in the format HH:MM - HH:MM [AaPp][Mm]
// with a total alloted time of 30 minutes.
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

// Assuming timeRanges were derived from adding 30 minutes to the
// times specified in this.times in the format HH:MM - HH:MM [AaPp][Mm]
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

function MeetingScheduling(props) {
  const [date, onChange] = useState(new Date());
  const [meetTimesContainer, setMeetTimesContainer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const createInterview = (time) => {
    const reqBody = {
      user: "000000000000000000000000", // TODO: Use real user ID once Firebase is merged in
      ambassador: "000000000000000000000001", // TODO: User real ambassador ID once Firebase is merged in
      date: dateToHumanFormat(date),
      time: timeToHumanFormat(time),
      location: "Zoom Link?", // TODO: generate a Zoom link here
      internalNotes: "",
      stage: props.stage,
    };

    // TODO: use functions with AUTH token once Firebase is merged  in
    fetch("http://localhost:8000/api/interviews", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }); /* .then(() =>
    // TODO: Use stage callback
  ); */
  };

  const setInterviewSlotSelected = React.useCallback((time) => createInterview(time));

  const updateMeetTimes = (interviews) => {
    const meetTimesTemp = [...times];
    interviews.map((interview) => {
      times.map((meetTime) => {
        if (timeInTimeRange(meetTime, interview.time) && meetTimesTemp.includes(meetTime)) {
          meetTimesTemp.splice(meetTimesTemp.indexOf(meetTime), 1);
        }
        return meetTime;
      });
      return interview;
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
    fetch(
      `http://localhost:8000/api/interviews/?` +
        new URLSearchParams({ date: dateToHumanFormat(date) }),
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((json) => {
        updateMeetTimes(json.interviews);
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

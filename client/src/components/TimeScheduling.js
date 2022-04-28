import React, { useState } from "react";
import Calendar from "react-calendar";
import left from "../images/left.svg";
import right from "../images/right.svg";
import "../css/calendar.css";
import "../css/timescheduling.css";

function TimeScheduling(props) {
 const [date, onChange] = useState(new Date());

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

  // TODO: make these propogate to the right schedule.date
  const schedules = props.schedules.map((schedule) => (
     <>
     <div class = "schedule-entry">
	  <div class="schedule-name-text">{schedule.name}</div>
	  <div class="schedule-role-text">{schedule.role}</div>
	  <div class="schedule-time-text">Times available: {schedule.time.join(", ")}</div>
     </div>
     <div class="schedule-divider"/>
     </>
  ));
    
  return (
    <div
      className="container"
    >
      <div className="container-text">Calendar</div>
      <div
        className="calendar-box"
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
          onActiveStartDateChange={({ activeStartDate }) =>
            onChange(
              new Date().getMonth() === activeStartDate.getMonth() ? new Date() : activeStartDate
            )
          }
        />
      </div>
      <div
        className="schedules-box"
      >
	<div className="schedules-box-section1">
          <div className="schedules-box-title">Times Avaliable</div>
          <div className="date">
            {[weekday[date.getDay()], month[date.getMonth()], date.getDate()].join(" ")}
          </div>
	</div>
        <div
          className="schedules-box-section2"
        >
	  {schedules}
	</div>
      </div>
    </div>
  );

}

export default TimeScheduling;

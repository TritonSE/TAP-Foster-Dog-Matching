import React, { useState } from "react";
import add from "../images/add.svg";
import trash from "../images/trash.svg";

import "../css/dayscheduling.css";

function DayScheduling(props) {
  const [timeSlotKeys, setTimeSlotKeys] = useState([]);

  const addTimeSlot = () => {
    const key = new Date().getTime();
    setTimeSlotKeys([...timeSlotKeys, key]);
  };

  const removeTimeSlot = (timeSlotKey, e) => {
    e.stopPropagation();
    setTimeSlotKeys(timeSlotKeys.filter((key) => timeSlotKey !== key));
  };

  return (
    <div className="day" key={props.day}>
      <div className="day-text">{props.day}</div>
      <div className="day-times-container">
        {timeSlotKeys.map((timeSlotKey) => (
          <div className="time-slot" key={timeSlotKey}>
            <div className="time-slot-begin">
              <input type="time" />
            </div>
            <div className="time-slot-divider" />
            <div className="time-slot-end">
              <input type="time" />
            </div>
            <div
              className="trash-button"
              role="button"
              tabIndex={0}
              onClick={(event) => removeTimeSlot(timeSlotKey, event)}
              onKeyDown={(event) => removeTimeSlot(timeSlotKey, event)}
            >
              <img className="trash-button-image" src={trash} alt="Remove Button" />
            </div>
          </div>
        ))}
      </div>
      <div
        className="day-add-button"
        role="button"
        tabIndex={0}
        onClick={addTimeSlot}
        onKeyDown={addTimeSlot}
      >
        <img className="day-add-button-image" src={add} alt="Add Button" />
      </div>
    </div>
  );
}

export default DayScheduling;

import React from "react";
import Select from "react-select";
import { nanoid } from "nanoid";
import add from "../images/add.svg";
import trash from "../images/trash.svg";

import "../css/dayscheduling.css";

function DayScheduling(props) {
  const addTimeSlot = () => {
    props.onChange({
      ...props.value,
      [props.day]: [...props.value[props.day], { key: nanoid() }],
    });
  };

  const removeTimeSlot = (keyToRemove, e) => {
    e.stopPropagation();
    const updatedSchedule = props.value[props.day].filter(({ key }) => keyToRemove !== key);
    props.onChange({
      ...props.value,
      [props.day]: updatedSchedule,
    });
  };

  const onTimeSlotChange = (key, bound, value) => {
    const updatedSchedule = props.value[props.day];
    const changedTimeSlot = updatedSchedule.find(({ key: timeSlotKey }) => key === timeSlotKey);
    changedTimeSlot[bound] = value;
    props.onChange({
      ...props.value,
      [props.day]: updatedSchedule,
    });
  };

  const time = [
    { value: "6:00am", label: "6:00am" },
    { value: "6:30am", label: "6:30am" },
    { value: "7:00am", label: "7:00am" },
    { value: "7:30am", label: "7:30am" },
    { value: "8:00am", label: "8:00am" },
    { value: "8:30am", label: "8:30am" },
    { value: "9:00am", label: "9:00am" },
    { value: "9:30am", label: "9:30am" },
    { value: "10:00am", label: "10:00am" },
    { value: "10:30am", label: "10:30am" },
    { value: "11:00am", label: "11:00am" },
    { value: "11:30am", label: "11:30am" },
    { value: "12:00pm", label: "12:00pm" },
    { value: "12:30pm", label: "12:30pm" },
    { value: "1:00pm", label: "1:00pm" },
    { value: "1:30pm", label: "1:30pm" },
    { value: "2:00pm", label: "2:00pm" },
    { value: "2:30pm", label: "2:30pm" },
    { value: "3:00pm", label: "3:00pm" },
    { value: "3:30pm", label: "3:30pm" },
    { value: "4:00pm", label: "4:00pm" },
    { value: "4:30pm", label: "4:30pm" },
    { value: "5:00pm", label: "5:00pm" },
    { value: "5:30pm", label: "5:30pm" },
    { value: "6:00pm", label: "6:00pm" },
    { value: "6:30pm", label: "6:30pm" },
    { value: "7:00pm", label: "7:00pm" },
    { value: "7:30pm", label: "7:30pm" },
    { value: "8:00pm", label: "8:00pm" },
    { value: "8:30pm", label: "8:30pm" },
    { value: "9:00pm", label: "9:00pm" },
    { value: "9:30pm", label: "9:30pm" },
    { value: "10:00pm", label: "10:00pm" },
    { value: "10:30pm", label: "10:30pm" },
    { value: "11:00pm", label: "11:00pm" },
    { value: "11:30pm", label: "11:30pm" },
    { value: "12:00am", label: "12:00am" },
  ];

  const customStyles = {
    option: () => ({
      borderBottom: "1px dotted pink",
      marginBottom: "10px",
      paddingLeft: 2,
    }),
    control: () => ({
      width: 80,
    }),
    valueContainer: () => ({
      paddingLeft: 1,
      paddingTop: 4,
    }),
    input: () => ({
      paddingBottom: 5,
      paddingLeft: 3,
    }),
  };

  return (
    <div className="day-scheduling-day" key={props.day}>
      <div className="day-scheduling-day-text">{props.day}</div>
      <div className="day-scheduling-day-times-container">
        {props.value[props.day].map(({ key, begin, end }) => (
          <div className="day-scheduling-time-slot" key={key}>
            <Select
              className="day-scheduling-time-slot-begin"
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              options={time}
              styles={customStyles}
              placeholder=""
              defaultValue={{ label: begin, value: begin }}
              onChange={({ value }) => onTimeSlotChange(key, "begin", value)}
            />
            <div className="day-scheduling-time-slot-divider" />
            <Select
              className="day-scheduling-time-slot-end"
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              options={time}
              styles={customStyles}
              placeholder=""
              defaultValue={{ label: end, value: end }}
              onChange={({ value }) => onTimeSlotChange(key, "end", value)}
            />
            <div
              className="day-scheduling-trash-button"
              role="button"
              tabIndex={0}
              onClick={(event) => removeTimeSlot(key, event)}
              onKeyDown={(event) => removeTimeSlot(key, event)}
            >
              <img className="day-scheduling-trash-button-image" src={trash} alt="Remove Button" />
            </div>
          </div>
        ))}
      </div>
      <div
        className="day-scheduling-day-add-button"
        role="button"
        tabIndex={0}
        onClick={addTimeSlot}
        onKeyDown={addTimeSlot}
      >
        <img className="day-scheduling-day-add-button-image" src={add} alt="Add Button" />
      </div>
    </div>
  );
}

export default DayScheduling;

import React from "react";
import TimeScheduling from "../components/TimeScheduling"

function Calendar() {
  return (
    <TimeScheduling
	  schedules = {[
	     {
		     name: "Clara A.",
		     role: "Foster Ambassador",
		     date: "2022-06-30",
		     time: ["5-8 pm", "4-3 pm"]
	     },
	     {
		     name: "Sam A.",
		     role: "Foster Ambassador",
		     date: "2022-06-30",
		     time: ["1-2 pm"]
	     },
	     {
		     name: "Jodi C.",
		     role: "Foster Director",
		     date: "2022-06-30",
		     time: ["7-8 pm", "9-10 am"]
	     },
	     {
		     name: "Mike H.",
		     role: "Foster Coordinator",
		     date: "2022-06-30",
		     time: ["1-2 pm"]
	     },
	     {
		     name: "Sara L.",
		     role: "Foster Ambassador",
		     date: "2022-06-30",
		     time: ["5-7 pm"]
	     }
	  ]}
    />
  );
}

export default Calendar;

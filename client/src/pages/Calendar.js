import React from "react";
import TimeScheduling from "../components/TimeScheduling";
import DefaultBody from "../components/DefaultBody";

/** Add NavBar and Header once merged */
function Calendar() {
  return (
    <DefaultBody>
      <TimeScheduling
        schedules={[
          {
            _id: "1",
            name: "Sam A.",
            role: "Foster Ambassador",
            date: "11/30/2022",
            time: ["5-8 pm", "4-3 pm"],
          },
          {
            _id: "2",
            name: "Clara A.",
            role: "Foster Ambassador",
            date: "11/30/2022",
            time: ["1-2 pm"],
          },
          {
            _id: "3",
            name: "Jodi C.",
            role: "Foster Director",
            date: "11/30/2022",
            time: ["7-8 pm", "9-10 am"],
          },
          {
            _id: "4",
            name: "Mike H.",
            role: "Foster Coordinator",
            date: "11/30/2022",
            time: ["1-2 pm"],
          },
          {
            _id: "5",
            name: "Sara L.",
            role: "Foster Ambassador",
            date: "11/30/2022",
            time: ["5-7 pm"],
          },
          {
            _id: "6",
            name: "William J.",
            role: "TAP Developer",
            date: "7/212/2022",
            time: ["1-3:30 am", "2-6 pm", "9-10 pm", "11pm-12am"],
          },
          {
            _id: "7",
            name: "Dhanush R.",
            role: "TAP Engineering Manager",
            date: "7/212/2022",
            time: ["1-3:30 am", "8am-1pm", "2-3 pm", "5-6 pm", "9-10 pm", "11pm-12am"],
          },
          {
            _id: "8",
            name: "Philip Z.",
            role: "TAP Developer",
            date: "12/3/2022",
            time: ["1-3 am"],
          },
          {
            _id: "9",
            name: "Andrew M.",
            role: "TAP Developer",
            date: "12/3/2022",
            time: ["1-3:30 am", "2-6 pm"],
          },
          {
            _id: "10",
            name: "Parth P.",
            role: "TAP Developer",
            date: "12/3/2022",
            time: ["9-10 pm", "11pm-12am"],
          },
          {
            _id: "11",
            name: "Artyom M.",
            role: "TAP Developer",
            date: "12/12/2022",
            time: ["1-3 am"],
          },
          {
            _id: "12",
            name: "Jacob A.",
            role: "TAP Developer",
            date: "12/12/2022",
            time: ["1-3 am", "4-7 am"],
          },
        ]}
      />
    </DefaultBody>
  );
}

export default Calendar;

import React from "react";
import Navbar from "../components/Navbar";

function Calendar() {
  return (
    <>
      <Navbar
        pages={{
          "Pending Applications": "/dashboard",
          "Current Fosters": "/fosters",
          "Calendar": "/calendar",
        }}
      />
      <div>
        <h1>Calendar</h1>
      </div>
    </>
  );
}

export default Calendar;

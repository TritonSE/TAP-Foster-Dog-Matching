import React from "react";
import Navbar from "../components/Navbar";

function Landing() {
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
        <h1>Landing</h1>
      </div>
    </>
  );
}

export default Landing;

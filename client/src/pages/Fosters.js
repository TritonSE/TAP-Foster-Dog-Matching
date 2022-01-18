import React from "react";
import Navbar from "../components/Navbar";

function Fosters() {
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
      <h1>Fosters</h1>
    </div>
    </>
  );
}

export default Fosters;

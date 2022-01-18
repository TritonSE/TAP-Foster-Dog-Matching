import React from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
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
        <h1>Dashboard</h1>
      </div>
    </>
  );
}

export default Dashboard;

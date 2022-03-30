import React from "react";
import Header from "../components/Header";
import DefaultBody from "../components/DefaultBody";
import DashboardCard from "../components/DashboardCard";
import IconButton from "../components/IconButton";
import dogCollage from "../images/dogcollage2.png";
import plus from "../images/plus.png";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div>
      <Navbar
        pages={{
          "Pending Applications": "/dashboard",
          "Current Fosters": "/fosters",
          Calendar: "/calendar",
        }}
      />
      <Header firstName="Placeholder" />
      <DefaultBody>
        <DashboardCard
          imagePath={dogCollage}
          imageAltText="Dog decoration image"
          cardText="Start Your Application"
          // TODO Give IconButton link href so it can function
          iconButton={
            <IconButton icon={plus} altText="ContinueButton" leftOffset="83%" topOffset="72%" />
          }
        />
      </DefaultBody>
    </div>
  );
}

export default Dashboard;

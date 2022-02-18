import React from "react";
import Header from "../components/Header";
import DefaultBody from "../components/DefaultBody";
import DashboardCard from "../components/DashboardCard";
import IconButton from "../components/IconButton";
import dogCollage from "../images/dogcollage2.png";
import plus from "../images/plus.png";

function Dashboard() {
  return (
    <div>
      <Header firstName="Placeholder" />
      <DefaultBody>
        <DashboardCard
          imagePath={dogCollage}
          imageAltText="Dog decoration image"
          cardText="Start Your Application"
          // TODO Give IconButton link href so it can function
          iconButton={
            <IconButton
              icon={plus}
              altText="ContinueButton"
              leftOffset="min(calc(100vw - 60px), 316px)"
              topOffset="156px"
            />
          }
        />
      </DefaultBody>
    </div>
  );
}

export default Dashboard;

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DefaultBody from "../components/DefaultBody";
import DashboardCard from "../components/DashboardCard";
import IconButton from "../components/IconButton";
import dogCollage from "../images/dogcollage2.png";
import plus from "../images/plus.png";
import { device } from "../utils/useResponsive";

const DashboardCardsContainer = styled.div`
  display: flex;
  ${device.mobile} {
    justify-content: center;
  }
`;

function Dashboard() {
  const navigate = useNavigate();

  return (
    <DefaultBody>
      <DashboardCardsContainer>
        <DashboardCard
          imagePath={dogCollage}
          imageAltText="Dog decoration image"
          cardText="Start Your Application"
          // TODO Give IconButton link href so it can function
          iconButton={
            <IconButton icon={plus} altText="ContinueButton" leftOffset="83%" topOffset="72%" />
          }
          onClick={() => navigate("/application")}
        />
      </DashboardCardsContainer>
    </DefaultBody>
  );
}

export default Dashboard;

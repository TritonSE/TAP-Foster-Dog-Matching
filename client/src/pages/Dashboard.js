import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultBody from "../components/DefaultBody";
import DashboardCard from "../components/DashboardCard";
import IconButton from "../components/IconButton";
import dogCollage from "../images/dogcollage2.png";
import plus from "../images/plus.png";
import { AuthContext } from "../contexts/AuthContext";
import { device } from "../utils/useResponsive";
import { getUser } from "../services/users";
import { getData } from "../services/data";

const DashboardCardsContainer = styled.div`
  display: flex;
  ${device.mobile} {
    justify-content: center;
  }
`;

function DashboardCards() {
  const [allDogs, setAllDogs] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState(null);
  const { currentUser, signedIn } = React.useContext(AuthContext);
  const [hasApplication, setHasApplication] = useState(null);
  const [completedApplication, setCompletedApplication] = useState(null);
  // get dogs from backend
  useEffect(() => {
    if (!signedIn) return;
    console.log(currentUser);
    console.log(signedIn);
    const userID = currentUser._id;
    // Find if the user has an application
    console.log(getData(`application/${userID}`));
    getUser(userID);
  }, [signedIn]);

  return (
    <div>
      {loaded &&
        allDogs.map((dog) => (
          <DashboardCard
            imagePath={dog.imageUrl[0]}
            imageAltText="Dog decoration image"
            cardText="Start Your Application"
            key={dog._id}
            // TODO Give IconButton link href so it can function
            iconButton={
              <IconButton icon={plus} altText="ContinueButton" leftOffset="83%" topOffset="72%" />
            }
          />
        ))}
    </div>
  );
}

function Dashboard() {
  return (
    <DefaultBody>
      <DashboardCardsContainer>
        <DashboardCards />
      </DashboardCardsContainer>
    </DefaultBody>
  );
}

export default Dashboard;

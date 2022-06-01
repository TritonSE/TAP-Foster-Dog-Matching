import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultBody from "../components/DefaultBody";
import DashboardCard from "../components/DashboardCard";
import IconButton from "../components/IconButton";
import dogCollage from "../images/dogcollage2.png";
import plus from "../images/plus.png";
// import { AuthContext } from "../contexts/AuthContext";
import { device } from "../utils/useResponsive";

const DashboardCardsContainer = styled.div`
  display: flex;
  ${device.mobile} {
    justify-content: center;
  }
`;

function DashboardCards() {
  const [allDogs, setAllDogs] = useState();
  const [loaded, setLoaded] = useState(false);
  // const currentUser = React.useContext(AuthContext);
  // console.log(currentUser);

  // get dogs from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/dogs/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.dogs);
        setAllDogs(json.dogs);
        setLoaded(true);
      });
  }, []);

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

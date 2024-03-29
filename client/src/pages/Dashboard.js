import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DefaultBody from "../components/DefaultBody";
import DashboardCard from "../components/DashboardCard";
import IconButton from "../components/IconButton";
import dogCollage from "../images/dogcollage.png";
import plus from "../images/plus.png";
import { AuthContext } from "../contexts/AuthContext";
import { device } from "../utils/useResponsive";
import { getApplication } from "../services/application";

const DashboardCardsContainer = styled.div`
  display: flex;
  ${device.mobile} {
    justify-content: center;
  }
`;

function DashboardCards() {
  const [loaded, setLoaded] = useState(false);
  const { currentUser, signedIn } = React.useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  // Get user from backend
  useEffect(() => {
    if (!signedIn) return;
    currentUser.applications.map((applicationId) =>
      getApplication(applicationId).then((application) => {
        const applicationsCopy = [];
        applicationsCopy.push(application.data.application);
        setApplications(applicationsCopy);
        setLoaded(false);
      })
    );
  }, [signedIn, loaded]);
  // Load all application models from backend
  useEffect(() => {
    if (applications !== [] && applications.length === currentUser.applications.length)
      setLoaded(true);
  }, [applications]);

  return (
    <div>
      {loaded && applications.length === 0 && (
        <DashboardCard
          key="0"
          imagePath={dogCollage}
          imageAltText="Dog decoration image"
          cardText="Start Your Application"
          navigationPath="/application"
          iconButton={
            <IconButton icon={plus} altText="ContinueButton" leftOffset="83%" topOffset="72%" />
          }
          onClick={() => navigate("/application")}
        />
      )}

      {loaded &&
        applications.length !== 0 &&
        applications.map((application) => (
          <DashboardCard
            imagePath={dogCollage}
            imageAltText="Dog decoration image"
            cardText="Continue your application"
            key={application._id}
            navigationPath="/application"
            iconButton={
              <IconButton icon={plus} altText="ContinueButton" leftOffset="83%" topOffset="72%" />
            }
            onClick={() => navigate("/application", { state: { id: application._id } })}
          />
        ))}
      {loaded &&
        currentUser.fosters.current.length !== 0 && <h1>Current Fosters</h1> &&
        currentUser.fosters.current.map((dog) => (
          <DashboardCard
            imagePath={dog.imageUrl || dogCollage}
            imageAltText="Dog decoration image"
            cardText={dog.name}
            key={dog._id}
            navigationPath="/application"
            iconButton={
              <IconButton icon={plus} altText="ContinueButton" leftOffset="83%" topOffset="72%" />
            }
          />
        ))}
      {loaded &&
        currentUser.fosters.past.length !== 0 && <h1>Past Fosters</h1> &&
        currentUser.fosters.past.map((dog) => (
          <DashboardCard
            imagePath={dog.imageUrl || dogCollage}
            imageAltText="Dog decoration image"
            cardText={dog.name}
            key={dog._id}
            navigationPath="/application"
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

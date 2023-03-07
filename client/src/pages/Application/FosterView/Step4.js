/**
 * Application (Foster View) Step 4
 */

import React, { useState } from "react";
import styled from "styled-components";
import Meetings from "../../../components/Meeting";
import logo from "../../../images/logo-inverted.png";
import doggo from "../../../images/good-boi.png";
import DogProfileCard from "../../../components/DogProfileCard";
import DogCard from "../../../components/DogCard";
import ApplicationContext from "../../../contexts/ApplicationContext";
import { getDog } from "../../../services/dogs";
import { updateApplication } from "../../../services/application";

const searchingForMatchesContent = (
  <>
    <p>
      The TAP team is working hard to find the perfect foster match for you. Hang tight, while we
      search.
    </p>
    <p>
      Once we have found foster dogs that match your criteria they will be displayed to the right.
      Let us know which ones you&apos;re interested in!
    </p>
  </>
);

const matchesFoundContent = (
  <>
    <p>The TAP team has found new foster matches!</p>
    <p>View your matches to the right and let us know which ones you&apos;re interested in!</p>
  </>
);

const FosterMatchesContainer = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 2%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const FosterMatchesContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
`;

const DogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow: scroll;
  flex: 1;
`;

const Heading = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-size: 25px;
`;

const Green = styled.div`
  color: #8dc442;
  font-weight: 700;
  font-size: 22px;
`;

function Intro() {
  const { applicationState } = React.useContext(ApplicationContext);

  return (
    <Meetings
      textCard={
        <div>
          <p className="message-from-admin">
            {applicationState.messages.stage3.replace(/\n/g, "\n\n")}
          </p>
          <img src={logo} alt="logo" />
        </div>
      }
      imagePath={doggo}
    />
  );
}

function FosterMatches() {
  const { setApplicationState, applicationState } = React.useContext(ApplicationContext);
  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    const res = [];
    Promise.all([
      applicationState.selectedDogs.map((dogId) =>
        getDog(dogId).then((response) => response.data.dog)
      ),
    ]).then((values) => {
      values[0].map((val) => val.then((data) => res.push(data)));
    });

    setMatches(res);
  }, []);

  const [curDog, setCurDog] = useState(null);

  return (
    <Meetings
      title="Status Update"
      textCard={
        <div>
          <p>Hello, {applicationState.firstName}</p>
          {matches.length === 0 ? searchingForMatchesContent : matchesFoundContent}
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      status={
        <FosterMatchesContainer>
          <Heading>Foster Matches</Heading>
          {matches.length > 0 && <p>Click on each card to show your interest!</p>}
          <FosterMatchesContentContainer>
            {matches.length === 0 ? (
              <Green>Looking for matches...</Green>
            ) : (
              <DogsContainer>
                {matches.map((dog, i) => (
                  <DogProfileCard {...dog} onClick={() => setCurDog(i + 1)} />
                ))}
              </DogsContainer>
            )}

            {/* info about dog when it is clicked */}
            <DogCard
              {...matches[curDog - 1]}
              isOpen={curDog}
              closeModal={() => setCurDog(null)}
              prefArr={applicationState.preference}
              appId={applicationState._id}
              setApplicationState={setApplicationState}
            />
          </FosterMatchesContentContainer>
        </FosterMatchesContainer>
      }
    />
  );
}

export default {
  intro: <Intro />,
  content: <FosterMatches />,
};

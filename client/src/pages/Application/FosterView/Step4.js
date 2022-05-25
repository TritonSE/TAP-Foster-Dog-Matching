/**
 * Application (Foster View) Step 4
 */

import React from "react";
import styled from "styled-components";
import Meetings from "../../../components/Meeting";
import logo from "../../../images/logo-inverted.png";
import doggo from "../../../images/good-boi.png";
import DogCard from "../../../components/DogProfileCard";

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

function FosterMatches() {
  const [matches, setMatches] = React.useState([
    {
      name: "tom",
      imageRef: doggo,
    },
    {
      name: "tom",
      imageRef: doggo,
    },

    {
      name: "tom",
      imageRef: doggo,
    },
    {
      name: "tom",
      imageRef: doggo,
    },
  ]);

  return (
    <Meetings
      title="Status Update"
      textCard={
        <div>
          <p>Hello, Shelby</p>
          <br />
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
              <Green>Still looking for matches...</Green>
            ) : (
              <DogsContainer>
                {matches.map((dog) => (
                  <DogCard {...dog} />
                ))}
              </DogsContainer>
            )}
          </FosterMatchesContentContainer>
        </FosterMatchesContainer>
      }
    />
  );
}

export default {
  intro: (
    <Meetings
      textCard={
        <div>
          <p>Hello, Shelby</p>
          <br />
          <p>Congratulations!! Your home screen was a success, you have passed Step 3!</p>
          <p>Please click on Step 4 to move to your foster matching process.</p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      imagePath={doggo}
    />
  ),
  content: <FosterMatches />,
};

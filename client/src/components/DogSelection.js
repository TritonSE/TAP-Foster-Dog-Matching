/**
 * Dog Selection Component
 *
 * Component for the "select a dog page"
 * TODO: populate real dog data, handle selected meet and greet
 *
 * @summary    Component for the fosters page
 * @author     Parth Patel
 *
 */

/*
Data is mapped to page from allDogs dictionary which is populated by 
a dictionary of the following format. 
{ 1: dog1, 2: dog2 ... 5: dog5}
There can be at most 5 dogs in this dictionary.

Each dog object (dog1, dog2...) has the following format:

dog = {
  name: [string],
  image: [image variable from import],
  curInterested: {
    preference: [string],
    time: [string],
  },
  notes: [string],
  othersInterested: [
    {
      name: [string],
      preference: [string],
      time: [string],
    },
    {
      name: [string],
      preference: [string],
      time: [string],
    },
  ],
  active: [boolean],
}

*/

import React, { useState } from "react";
import styled from "styled-components";
import DogSummary from "./DogSummary";
import DogHappy from "../images/DogHappy.png";

const dog1 = {
  name: "Happy",
  image: DogHappy,
  curInterested: {
    preference: "Love",
    time: "11:00 PM",
  },
  notes:
    "Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  othersInterested: [
    {
      name: "Stacy",
      preference: "Like",
      time: "12:05 PM",
    },
    {
      name: "Molly",
      preference: "Love",
      time: "1:42 PM",
    },
  ],
  active: false,
};
const dog2 = dog1;
const dog3 = dog1;
const dog4 = dog1;
const dog5 = dog1;
// dummy data
const allDogs = { 1: dog1, 2: dog2, 3: dog3, 4: dog4, 5: dog5 };

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DogWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  max-height: 660px;
  @media screen and (max-width: 750px) {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 350px) {
    width: 100%;
  }
  @media screen and (max-height: 1000px) {
    max-height: 585px;
  }
  @media screen and (max-height: 850px) {
    max-height: 575px;
  }
  @media screen and (max-height: 750px) {
    max-height: 565px;
  }
`;

const ActiveWrapper = styled.div`
  max-height: calc(660px - 4vh);
  width: 259px;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-bottom: 2vh;
  padding: 10px 0px;
  border-radius: 10px;
  border: 3px solid #8dc442;
  background: ${(props) => (props.active ? "rgba(141, 196, 66, 0.5)" : "white")};
  cursor: pointer;
`;

const Button = styled.button`
  position: relative;
  width: 216px;
  height: 52px;
  bottom: 0;
  margin-top: 15px;
  border: none;

  background: #8dc442;
  border-radius: 10px;

  font-family: Nunito;
  font-size: 22px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;

  cursor: ${(props) => (props.cursor ? "pointer" : "default")};
`;

const Text = styled.p`
  margin: 0;
  margin-bottom: 15px;

  font-size: 30px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
`;

function DogSummaryWrap({ dog, active, onClick }) {
  return (
    <ActiveWrapper onClick={onClick} active={active}>
      <DogSummary props={dog} />
    </ActiveWrapper>
  );
}

const handleSubmit = (current) => {
  if (current === -1) {
    // nothing was submitted, so do nothing
  } else {
    // TODO: handle submit where allDogs[current] is the dog we are dealing with
  }
};

function DogSelection() {
  const [current, setCurrent] = useState(-1);

  return (
    <Content>
      <Text>Select a dog to confirm Meet & Greet</Text>
      {/* map out the dogs */}
      <DogWrapper>
        {Object.entries(allDogs).map(([key, dog]) => {
          if (key === current) {
            // element is active
            return <DogSummaryWrap onClick={() => setCurrent(-1)} active dog={dog} key={key} />;
          }
          // element is not active
          return (
            <DogSummaryWrap onClick={() => setCurrent(key)} active={false} dog={dog} key={key} />
          );
        })}
      </DogWrapper>
      <Button cursor={!(current === -1)} onClick={handleSubmit(current)}>
        Confirm
      </Button>
    </Content>
  );
}

export default DogSelection;

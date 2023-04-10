/**
 * Dog Summary Card
 *
 * Component displaying information about dog and who likes the dog
 *
 * @summary    Component used in dog selection component (DogSelection.js)
 * @author     Parth Patel
 *
 */

import React from "react";
import styled from "styled-components";
import DogHappy from "../images/DogHappy.png";

const DogContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Name = styled.p`
  font-size: 27px;
  margin: 0;
`;

const Image = styled.img`
  height: 100px;
  width: 223px;
  border-radius: 8px;
`;

const Text = styled.p`
  font-size: 22px;
  font-weight: 400;
  margin: 0;
`;

const Interest = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
`;

// note: at this time, we do not store the necessary information to display things like others
//       preferences on a certain dog or the time the preference was made, so that is omitted here
function DogSummary({ dog }) {
  return (
    <DogContainer>
      <Name>{dog.name}</Name>
      <Image src={dog.image || DogHappy} />
      <Interest>
        <Text>Interest: </Text>
        <Text>{dog.preference} </Text>
      </Interest>
    </DogContainer>
  );
}

export default DogSummary;

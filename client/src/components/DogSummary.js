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

const DogContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 23%;
  margin-bottom: 3vh;
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

const MoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 65%;
`;

const Text = styled.p`
  font-size: 22px;
  font-weight: 400;
  margin: 0;
`;

const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: calc(100% - 36px);
  padding-left: 18px;
  padding-right: 18px;
  margin-bottom: 4vh;
`;

const Notes = styled.p`
  font-size: 18px;
  margin: 0;
`;

const InterestedWrapper = styled.div`
  font-size: 18px;

  position: relative;
  width: calc(100% - 36px);
  padding-left: 18px;
  padding-right: 18px;
  margin-bottom: 4vh;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Time = styled(Text)`
  text-align: right;
`;

function Interested(props) {
  return (
    <>
      <Row>
        <Text>{props.title}</Text>
        <Text>{props.preference}</Text>
      </Row>
      <Time>{props.time}</Time>
    </>
  );
}

function DogSummary({ props }) {
  return (
    <DogContainer>
      <Intro>
        <Name>{props.name}</Name>
        <Image src={props.image} />
      </Intro>
      <MoreInfo>
        <InterestedWrapper>
          <Interested
            title="Interest:"
            preference={props.curInterested.preference}
            time={props.curInterested.time}
          />
        </InterestedWrapper>

        <NotesWrapper>
          <Text>Notes:</Text>
          <Notes>{props.notes}</Notes>
        </NotesWrapper>

        <InterestedWrapper>
          <Text>Others Interested:</Text>
          <Interested
            title={props.othersInterested[0].name}
            preference={props.othersInterested[0].preference}
            time={props.othersInterested[0].time}
          />
          <Interested
            title={props.othersInterested[1].name}
            preference={props.othersInterested[1].preference}
            time={props.othersInterested[1].time}
          />
        </InterestedWrapper>
      </MoreInfo>
    </DogContainer>
  );
}

export default DogSummary;

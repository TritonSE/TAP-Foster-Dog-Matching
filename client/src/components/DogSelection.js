/**
 * Dog Selection Component
 *
 * Component for the "select a dog page"
 *
 * @summary    Component for the fosters page
 * @author     Parth Patel
 *
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DogSummary from "./DogSummary";
import PassFail from "./PassFail";
import FOSTER_EVALUATION_INITIAL_MESSAGES from "../constants/FOSTER_EVALUATION_INITIAL_MESSAGES";
import { updateApplication } from "../services/application";
import ApplicationContext from "../contexts/ApplicationContext";
import { getDog } from "../services/dogs";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3vh;
`;

const DogWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: visible;
  @media screen and (max-width: 750px) {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 350px) {
    width: 100%;
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
      <DogSummary dog={dog} />
    </ActiveWrapper>
  );
}

function DogSelection() {
  const { applicationId, setApplicationState, applicationState } =
    React.useContext(ApplicationContext);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [current, setCurrent] = useState(-1);
  const [matches, setMatches] = React.useState([]);

  useEffect(() => {
    const res = [];

    Promise.all(
      applicationState.selectedDogs.map((dogId) =>
        getDog(dogId).then((response) => response.data.dog)
      )
    ).then((values) => {
      values.map((val) => res.push(val));
    });

    setMatches(res);
  }, []);

  const onConfirmMeetAndGreet = React.useCallback(
    (content) => {
      const reqBody = {
        messages: {
          stage4: content,
        },
        finalDog: applicationState.selectedDogs[current],
        status: "Step 5: Meet & Greet",
      };
      updateApplication(applicationId, reqBody).then((response) =>
        setApplicationState(response.data.application)
      );
    },
    [applicationId, current]
  );

  useEffect(() => console.log(current), [current]);

  return (
    <Content>
      <Text>Select a dog to confirm Meet & Greet</Text>
      {/* map out the dogs */}
      <DogWrapper>
        {matches.map((dog, key) => {
          dog.preference = applicationState.preference[key];
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
      <Button
        cursor={!(current === -1)}
        onClick={() => (current !== -1 ? setShowConfirmDialog(true) : undefined)}
      >
        Confirm
      </Button>
      <PassFail
        visible={showConfirmDialog}
        setVisible={setShowConfirmDialog}
        status="Confirm Meet & Greet"
        initialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.MEET_AND_GREET.CONFIRM}
        onConfirm={onConfirmMeetAndGreet}
      />
    </Content>
  );
}

export default DogSelection;

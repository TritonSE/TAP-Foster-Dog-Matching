import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../utils/useResponsive";
import After from "./AfterMeetAndGreet";
import StatusUpdate from "./StatusUpdate";
import useInterview from "../hooks/useInterview";
import ApplicationContext from "../contexts/ApplicationContext";
import APPLICATION_STAGES from "../constants/APPLICATION_STAGES";
import FOSTER_EVALUATION_INITIAL_MESSAGES from "../constants/FOSTER_EVALUATION_INITIAL_MESSAGES";
import { updateApplication } from "../services/application";
import PassFail from "./PassFail";
import { getDog, updateDog } from "../services/dogs";

const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  background: #000000;
  border-radius: 35px;
  margin-bottom: 3vh;
  ${device.tablet} {
    min-height: 80vh;
    overflow-y: scroll;
  }
`;
const ComponentHeader = styled.p`
  margin: 0;
  margin-top: 1.5vh;
  color: white;

  color: #ffffff;
  text-align: center;
  font-weight: 700;
  font-size: 33px;

  color: #ffffff;
  ${device.tablet} {
    font-size: 28px;
    padding: 5px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.875vw;
  padding: 1.875vw;

  ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  border-radius: 35px;

  ${device.tablet} {
    width: 80%;
    height: fit-content;

    overflow: visible;
    margin: 5%;
    margin-top: 3%;
  }
`;

const AfterWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
  border-radius: 35px;

  ${device.tablet} {
    width: 80%;
    height: fit-content;

    overflow: visible;
    margin: 5%;
    margin-bottom: 3%;
  }
`;

const ConfirmButton = styled.button`
  background: #8dc442;
  border-radius: 10px;
  width: 216px;
  min-height: 52px;
  font-size: 22.2876px;
  margin-bottom: 3vh;
  cursor: pointer;
  align-self: center;
  border: none;
`;

function ConfirmMeetGreet() {
  const { applicationState, setApplicationState, applicationId, goToStep } =
    React.useContext(ApplicationContext);
  const { interview } = useInterview(applicationState.user, APPLICATION_STAGES.MEET_AND_GREET);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [dog, setDog] = useState({});

  useEffect(() => {
    getDog(applicationState?.finalDog).then((res) => setDog(res.data.dog));
  }, []);

  const onConfirmMeetAndGreet = React.useCallback(
    (content) => {
      const reqBody = {
        messages: {
          stage4: content,
        },
        status: "Step 6: Foster in Home",
      };
      updateApplication(applicationId, reqBody).then((response) => {
        setApplicationState(response.data.application);
        goToStep((step) => step + 1);
      });
      updateDog(applicationState?.finalDog, { category: "in home" });
    },
    [applicationId]
  );

  return (
    <ConfirmContainer>
      <ComponentHeader>Meet & Greet Information</ComponentHeader>
      <ContentWrapper>
        <InfoWrapper>
          <StatusUpdate title="Meet and Greet Info" {...interview} meetAndGreetView />
        </InfoWrapper>
        <AfterWrapper>
          <After
            dogMet={dog.name}
            dogHome={dog.name}
            supplies={[
              "Lorem Ipsum dolor sit amet, consectetur adipiscing elit.",
              "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            ]}
          />
        </AfterWrapper>
      </ContentWrapper>
      <ConfirmButton onClick={() => setShowConfirmDialog(true)}>Confirm</ConfirmButton>
      <PassFail
        visible={showConfirmDialog}
        setVisible={setShowConfirmDialog}
        status="Confirm Meet & Greet"
        initialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.FOSTER_IN_HOME.CONFIRM}
        onConfirm={onConfirmMeetAndGreet}
      />
    </ConfirmContainer>
  );
}

export default ConfirmMeetGreet;

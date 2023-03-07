/**
 * Application (Foster View) Step 5
 */

import React from "react";
import MeetingScheduling from "../../../components/MeetingScheduling";
import StatusUpdate from "../../../components/StatusUpdate";
import Meetings from "../../../components/Meeting";
import logo from "../../../images/logo-inverted.png";
import doggo from "../../../images/good-boi.png";
import ApplicationContext from "../../../contexts/ApplicationContext";
import APPLICATION_STAGES from "../../../constants/APPLICATION_STAGES";
import useInterview from "../../../hooks/useInterview";

// for which dog the foster was matched with to meet and greet
function Match() {
  const { applicationState, goToStep } =
    React.useContext(ApplicationContext);

  return (
    <div onClick={() => goToStep(4)}> 
      <Meetings
        textCard={
          <div>
            <p className="message-from-admin">
              {applicationState.messages.stage4.replace(/\n/g, "\n\n")}
            </p>
            <img src={logo} alt="logo" />
          </div>
        }
        imagePath={doggo}
      />
    </div>
  );
}

function Intro() {
  const { applicationState } = React.useContext(ApplicationContext);

  return (
    <Meetings
      textCard={
        <div>
          <p className="message-from-admin">
            {applicationState.messages?.stage4.replace(/\n/g, "\n\n")}
          </p>
          <img src={logo} alt="logo" />
        </div>
      }
      imagePath={doggo}
    />
  );
}

function ScheduleMeetAndGreet() {
  const [view, setView] = React.useState("schedule");
  const { applicationState } = React.useContext(ApplicationContext);
  const { interview, refetchInterview } = useInterview(
    applicationState.user,
    APPLICATION_STAGES.MEET_AND_GREET
  );

  React.useEffect(() => {
    if (interview) setView("confirmed");
  }, [interview]);

  const setInterviewConfirmed = React.useCallback(() => {
    refetchInterview();
    setView("confirmed");
  }, []);

  if (view === "schedule")
    return (
      <MeetingScheduling
        title="Meet & Greet Scheduling"
        stage={APPLICATION_STAGES.MEET_AND_GREET}
        times={[
          "11:00 AM",
          "11:30 AM",
          "12:00 PM",
          "12:30 PM",
          "1:00 PM",
          "5:00 PM",
          "5:30 PM",
          "6:00 PM",
          "6:30 PM",
          "7:00 PM",
        ]}
        interviewConfirmedCallback={setInterviewConfirmed}
      />
    );
  return (
    <Meetings
      title="Meet & Greet Confirmed"
      textCard={
        <div>
          <p>Hello, {applicationState.firstName}</p>
          <p>
            Your Meet & Greet has been confirmed! An ambassador from TAP has been assigned to your
            application and they will be in contact with you shortly.
          </p>
          <p>
            If you have any young children or other dogs please bring them to your Meet & Greet! If
            it goes well you will be taking your foster dog home after the Meet & Greet!
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      status={<StatusUpdate title="Meet & Greet Info" {...interview} />}
    />
  );
}

export default {
  match: <Match />,
  intro: <Intro />,
  content: <ScheduleMeetAndGreet />,
};

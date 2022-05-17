/**
 *
 * Application Page
 *
 * Content for each step goes in the respective objects in the ApplicationContent array where the key represents the sub-step.
 * Intro content for the step (white filled circle) goes in the 'intro' key.
 * Actual content for the step (green filled circle) goes in the 'content' key.
 * The indices represent each step of the application (0-indexed).
 *
 * ApplicationContext:
 *
 * Use this context to get the current step and to move to different steps of the application.
 *
 * Value:
 *      - currentStep - number representing current step of the application (0-indexed)
 *      - currentSubStep - string (either 'intro' or 'content') representing the current sub-step of the application
 *      - goToStep(step: number, subStep: 'intro'|'content') - go to step in the application. pass in step of the application you want to go to (0-indexed)
 *                                                             and the sub-step (either 'intro' or 'content'. default: 'intro').
 *      - goToNextSubStep - move to 'content' sub-step.
 *
 * Usage:
 *
 * import ApplicationContext from "../contexts/ApplicationContext";
 *
 * In the component:
 *
 * const { currentStep, currentSubStep, goToStep, goToNextSubStep } = React.useContext(ApplicationContext);
 *
 * (See components/ApplicationProgress.js for complete usage example)
 */

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ApplicationProgress from "../components/ApplicationProgress";
import { device } from "../utils/useResponsive";
import DefaultBody from "../components/DefaultBody";
import FosterApplication from "../components/FosterApplication";
import Meetings from "../components/Meeting";
import logo from "../images/logo-inverted.png";
import doggo from "../images/good-boi.png";
import ApplicationContext from "../contexts/ApplicationContext";
import MeetingScheduling from "../components/MeetingScheduling";
import StatusUpdate from "../components/StatusUpdate";

const ApplicationContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100vw;
  height: calc(100% + 50px);
  margin-bottom: -50px;
  ${device.tablet} {
    flex-direction: row;
    height: calc(100% + 20px);
    margin-bottom: -20px;
    gap: 10px;
  }
`;

const ApplicationContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
  ${device.tablet} {
    margin-top: 100px;
  }
  ${device.mobile} {
    margin-top: 20%;
  }
`;

const ExitButton = styled.div`
  position: absolute;
  top: -30px;
  left: -10px;
  font-size: 16px;
  cursor: pointer;
  ${device.tablet} {
    top: -10px;
  }
`;

function ScheduleInterview() {
  const [view, setView] = React.useState("schedule");

  const setInterviewConfirmed = React.useCallback(() => setView("confirmed"), []);
  if (view === "schedule")
    return (
      <MeetingScheduling
        title="Interview Scheduling"
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
      title="Interview Confirmed"
      textCard={
        <div>
          <p>Hello, Shelby</p>
          <p>
            Your interview has been confirmed! An ambassador from TAP has been assigned to your
            application and they will be in contact with you shortly.
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      status={
        <StatusUpdate
          title="Interview Info"
          ambassador="Dhanush"
          phone="123-456-7890"
          email="test@tap.com"
          date="1/1/2022"
          time="6-7:00PM"
          location="Zoom"
        />
      }
    />
  );
}

function ScheduleHomeScreen() {
  const [view, setView] = React.useState("schedule");

  const setInterviewConfirmed = React.useCallback(() => setView("confirmed"), []);
  if (view === "schedule")
    return (
      <MeetingScheduling
        title="Home Screen Scheduling"
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
      title="Home Screen Confirmed"
      textCard={
        <div>
          <p>Hello, Shelby</p>
          <p>
            Your Home Screen has been confirmed! An ambassador from TAP has been assigned to your
            application and they will be in contact with you shortly.
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      status={
        <StatusUpdate
          title="Home Screen Info"
          ambassador="Dhanush"
          phone="123-456-7890"
          email="test@tap.com"
          date="1/1/2022"
          time="6-7:00PM"
          location="Zoom"
        />
      }
    />
  );
}

function FosterMatches() {
  return (
    <Meetings
      title="Status Update"
      textCard={
        <div>
          <p>Hello, Shelby</p>
          <br />
          <p>
            The TAP team is working hard to find the perfect foster match for you. Hang tight, while
            we search.
          </p>
          <p>
            Once we have found foster dogs that match your criteria they will be displayed to the
            right. Let us know which ones you&apos;re interested in!
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      status={<h1>foster matches component goes here</h1>}
    />
  );
}

function ScheduleMeetAndGreet() {
  const [view, setView] = React.useState("schedule");

  const setInterviewConfirmed = React.useCallback(() => setView("confirmed"), []);
  if (view === "schedule")
    return (
      <MeetingScheduling
        title="Meet & Greet Scheduling"
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
          <p>Hello, Shelby</p>
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
      status={
        <StatusUpdate
          title="Meet & Greet Info"
          ambassador="Dhanush"
          phone="123-456-7890"
          email="test@tap.com"
          date="1/1/2022"
          time="6-7:00PM"
          location="Zoom"
        />
      }
    />
  );
}

const FosterResourcesActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  gap: 20px;
`;

const Button = styled.div`
  padding: 15px 60px;
  cursor: pointer;
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 10px;
  font-size: 20px;
`;

function FosterInHomeContent() {
  const navigate = useNavigate();
  const [view, setView] = React.useState("resources");

  if (view === "resources")
    return (
      <Meetings
        title="Foster Resources"
        textCard={<div>barnacle component here</div>}
        status={
          <div>
            <StatusUpdate
              title="Ambassador Contact Info"
              ambassador="Dhanush"
              phone="123-456-7890"
              email="test@tap.com"
              tapFacilityLocation="Address"
            />
            <FosterResourcesActions>
              <Button onClick={() => setView("adoption")}>Adopt</Button>
              <Button onClick={() => navigate("/contact")}>Contact</Button>
            </FosterResourcesActions>
          </div>
        }
      />
    );
  return (
    <Meetings
      title="Adoption"
      textCard={
        <div>
          <p>Hello, Shelby</p>
          <p>
            Thank you for your interest in making an adoption. We are so excited for you to become a
            foster fail! A member from our adoption team will reach out to you shortly. Please feel
            free to reach out to us if you have any questions for the time being.
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
    />
  );
}

function Application() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentSubStep, setCurrentSubStep] = React.useState("content");

  const goToNextSubStep = React.useCallback(() => {
    setCurrentSubStep("content");
  }, []);

  const goToStep = React.useCallback((step, subStep = "intro") => {
    setCurrentStep(step);
    setCurrentSubStep(step === 0 ? "content" : subStep);
  }, []);

  const ApplicationContent = [
    {
      content: <FosterApplication />,
    }, //  Step 1
    {
      intro: (
        <Meetings
          textCard={
            <div>
              <p>Hello, Shelby</p>
              <br />
              <p>Congratulations!! Your foster application has been approved!</p>
              <p>
                Please click on Step 2 to schedule your initial interview with a TAP team member.
              </p>
              <p>Best,</p>
              <p>The Animal Pad Team</p>
              <img src={logo} alt="logo" />
            </div>
          }
          imagePath={doggo}
        />
      ),
      content: <ScheduleInterview />,
    }, //  Step 2
    {
      intro: (
        <Meetings
          textCard={
            <div>
              <p>Hello, Shelby</p>
              <br />

              <p>Congratulations!! Your initial interview was a success, you have passed Step 2!</p>
              <p>Please click on Step 3 to schedule your home check with a TAP team member.</p>
              <p>Best,</p>
              <p>The Animal Pad Team</p>
              <img src={logo} alt="logo" />
            </div>
          }
          imagePath={doggo}
        />
      ),
      content: <ScheduleHomeScreen />,
    }, //  Step 3
    {
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
    }, //  Step 4
    {
      intro: (
        <Meetings
          textCard={
            <div>
              <p>Hello, Shelby</p>
              <br />
              <p>The TAP team has matched you with Skippy as your next foster!</p>
              <br />
              <p>Click on step 5 to schedule your meet and greet with Skippy!</p>
              <br />
              <p>Best,</p>
              <p>The Animal Pad Team</p>
              <img src={logo} alt="logo" />
            </div>
          }
          imagePath={doggo}
        />
      ),
      content: <ScheduleMeetAndGreet />,
    }, //  Step 5
    {
      intro: (
        <Meetings
          textCard={
            <div>
              <p>Hello, Shelby</p>
              <br />
              <p>
                Congratulations!! Your Meet & Greet was a success, you have been passed step 5 and
                are now a TAP foster!
              </p>
              <p>
                Please click on Step 6 to communicate with us during your time fostering. Best, The
                Animal Pad Team
              </p>
              <p>Best,</p>
              <p>The Animal Pad Team</p>
              <img src={logo} alt="logo" />
            </div>
          }
          imagePath={doggo}
        />
      ),
      content: <FosterInHomeContent />,
    }, //  Step 6
  ];

  const applicationData = React.useMemo(
    () => ({
      currentStep,
      currentSubStep,
      goToStep,
      goToNextSubStep,
    }),
    [currentStep, currentSubStep, goToStep, goToNextSubStep]
  );

  return (
    <DefaultBody>
      <ApplicationContext.Provider value={applicationData}>
        <ApplicationContainer>
          <ExitButton onClick={() => navigate("/dashboard")}>Exit</ExitButton>
          <ApplicationProgress />
          <ApplicationContentContainer>
            {ApplicationContent[currentStep][currentSubStep] ||
              ApplicationContent[currentStep]["intro"] ||
              ApplicationContent[currentStep]["content"]}
          </ApplicationContentContainer>
        </ApplicationContainer>
      </ApplicationContext.Provider>
    </DefaultBody>
  );
}

export default Application;

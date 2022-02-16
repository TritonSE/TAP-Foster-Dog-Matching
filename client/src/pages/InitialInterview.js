import React from "react";
import Meeting from "../components/meeting";
import StatusUpdate from "../components/StatusUpdate";
import Doggo from "../images/good-boi.png";
import pfp from "../images/eren.png";

function InitialInterview() {
  return (
    <div>
      <h1>Initial Interview</h1>

      <Meeting
        title="Interview Confirmed"
        textCard={
          <div>
            <p>Hello Bob</p>
            <p>Congratulations on confirming your first interview. That is pogpilled and based.</p>
            <p>The Animal Pad Team</p>
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
            image={pfp}
          />
        }
      />
    </div>
  );
}

export default InitialInterview;

import React from "react";
import Meeting from "../components/meeting";
import Doggo from "../images/good-boi.png";

function InitialInterview() {
  return (
    <div>
      <h1>Initial Interview</h1>
      <Meeting
        title="Interview Confirmed"
        imagePath={Doggo}
        textCard={
          <div>
            <p>Hello Bob</p>
            <p>Congratulations on confirming your first interview. That is pogpilled and based.</p>
            <p>The Animal Pad Team</p>
          </div>
        }
      />
    </div>
  );
}

export default InitialInterview;

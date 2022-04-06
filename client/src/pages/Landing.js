import React from "react";
import PassFail from "../components/PassFail"

function Landing() {
  return (
    <div>
      <h1>Landing</h1>
      <PassFail 
        status = 'Pass'
        initialMessage = 'Test Message, I love rice!'
      />

    </div>
  );
}

export default Landing;

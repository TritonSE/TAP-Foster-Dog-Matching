import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import dog from "../images/dog.png";
import "../styles/landing.css";

function Landing() {
  const foster = {
    position: "absolute",
    width: "182px",
    height: "69px",
    top: "182px",
    left: "570px",
  };
  const volunteer = {
    position: "absolute",
    width: "182px",
    height: "69px",
    top: "467px",
    left: "570px",
  };

  return (
    <div>
      <Header />
      <div id="landing-body">
        <div className="form-container">
          <b className="form-header">Welcome</b>
          <div>Are you a...</div>
          <Button styleBorder={foster} name="Foster" />
          <Button styleBorder={volunteer} name="Volunteer" />
        </div>
        <div id="landing-right-panel">
          <img id="landing-dog" src={dog} alt="Cute dog!" />
          <div id="copyright">
            © 2020 The Animal Pad | All rights reserved The Animal Pad is a 501c3 Organization EIN
            #45-4902841.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

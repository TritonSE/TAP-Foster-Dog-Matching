import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import dog from "../images/dog.png";
import "../styles/landing.css";

function Landing() {
  const fosterBorder = {
    position: "absolute",
    width: "182px",
    height: "69px",
    top: "182px",
    left: "570px",
  };
  const volunteerBorder = {
    position: "absolute",
    width: "182px",
    height: "69px",
    top: "467px",
    left: "570px",
  };
  const fosterText = {
    position: "static",
    width: "62px",
    height: "29px",
    left: "60px",
    top: "20px",
  };
  const volunteerText = {
    position: "static",
    width: "62px",
    height: "29px",
    left: "67px",
    top: "20px",
  };

  return (
    <div>
      <Header />
      <div>
        <div className="form-login-container">
          <b className="form-header">Welcome</b>
          <div id="form-landing-question">Are you a...</div>
          <Button styleBorder={fosterBorder} styleText={fosterText} name="Foster" />
          <Button styleBorder={volunteerBorder} styleText={volunteerText} name="Volunteer" />
        </div>
        <div className="landing-right-panel">
          <img className="dog-image" src={dog} alt="Cute dog!" />
          <div className="copyright">
            © 2020 The Animal Pad | All rights reserved The Animal Pad is a 501c3 Organization EIN
            #45-4902841.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

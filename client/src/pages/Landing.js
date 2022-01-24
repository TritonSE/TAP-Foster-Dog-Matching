import React from "react";
import Header from "../components/LoginHeader";
import Button from "../components/Button";
import dog from "../images/dog.png";
import "../styles/landing.css";

function Landing() {
  return (
    <div>
      <Header />
      <div className="left-panel">
        <div className="form-container">
          <b className="form-header">Welcome</b>
          <div className="form-landing-question">Are you a...</div>
          <Button buttonLink="/login" class="foster" name="Foster" />
          <Button buttonLink="/login" class="admin" name="Admin" />
        </div>
        <div className="copyright">
          © 2020 The Animal Pad | All rights reserved
          <div>The Animal Pad is a 501c3 Organization EIN #45-4902841.</div>
        </div>
      </div>
      <div className="right-panel">
        <img className="dog-image" src={dog} alt="Cute dog!" />
        <div className="copyright">
          © 2020 The Animal Pad | All rights reserved
          <div>The Animal Pad is a 501c3 Organization EIN #45-4902841.</div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

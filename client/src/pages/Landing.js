/**
 * Landing Component
 *
 * @summary  Component for the landing page, which uses the header and form components.
 * @author   Artyom Muradyan
 *
 */

import React from "react";
import Header from "../components/Header";
import IntroForm from "../components/IntroForm";
import dog from "../images/dog.png";
import "../css/landing.css";

function Landing() {
  return (
    <div>
      <Header />
      <IntroForm formType="landing" header="Welcome" />
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

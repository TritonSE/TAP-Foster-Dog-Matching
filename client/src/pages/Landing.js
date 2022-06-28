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
import DogCard from "../components/DogCard";

function Landing() {
  return (
    <div className="intro-page">
      {/* <DogCard 
      name="Tom "
      age="5 months old"
      gender ="male"
      breed = "diff"
      weight={4}
      image={dog}
      background="this dog is a very nice dog"
      vettingInfo="this this dog has been vettedthis dog has this dog has been vetted this dog has been vettedbeen vettedthis dog has been vetteddog has been vetted this dog has been vetted this dog has been vetted this dog has been vetted this dog has been this dog has been vetted this dogthis dog has been vettedthis dog has been vettedthis dog has been vettedthis dog has been vettedthis dog has been vettedthis dog has been vettedthis dog has been vetted has been vetted vetted"

      /> */}

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

/**
 * Application (Foster View) Step 4
 */

import React from "react";
import Meetings from "../../../components/Meeting";
import logo from "../../../images/logo-inverted.png";
import doggo from "../../../images/good-boi.png";

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

export default {
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
};

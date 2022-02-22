import React from "react";
import dog from "../images/barnacle.png";
import DogCard from "../components/DogCard";

function Landing() {
  const background =
    "Hi, there! My name is Barnacle. Not to brag, but I’m pretty much the pawfect dog. Just like my saucy namesake, I go with everything! I’m smart, well-behaved, playful, and a total lovebug. I’m a 4-month-old, 8-pound chihuahua mix. I’m already fixed and I’m a healthy boy. Now that I’m safe and sound in the states, I just want a kitchen… ahem, I mean a home of my own! I’m a friendly girl who gets along with people and pooches. I love hoomans and I do very well with kids. I’ll even gently take treats from a toddler. I’m a total people pleaser! I need a slow introduction to other dogs, but once I know I have a friend, I’m in 7th heaven. I adore trips to the park, running after the ball and my other doggy friends. I do well off-leash and I’m great at listening when you call.";

  const vetting = "Barnacle does not have any health concerns or behavioral issues he does great.";

  return (
    <div>
      <h1>Landing</h1>
      <DogCard
        name="Barnacle"
        image={dog}
        age="4 months old"
        gender="Male"
        breed="Chihuahua mix"
        weight="8 lbs"
        background={background}
        vetting={vetting}
      />
    </div>
  );
}

export default Landing;

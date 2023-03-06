const FOSTER_EVALUATION_INITIAL_MESSAGES = {
  FOSTER_APPLICATION: {
    PASS: (name) => `<p>Hello, ${name}</p>
          <br />
          <p>Congratulations!! Your foster application has been approved!</p>
          <p>Please click on Step 2 to schedule your initial interview with a TAP team member.</p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>`,
    REJECT: (name) => `<p>Hello, ${name}</p>
          <br />
          <p>Unfortunately, you did not pass the initial application and do not match the type of foster TAP is looking for.</p>
          <p>You may contact the TAP team and re-apply after some time.</p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>`,
  },
  INTERVIEW: {
    PASS: (name) => `<p>Hello, ${name}</p>
          <br />
          <p>Congratulations!! Your initial interview was a success, you have passed Step 2!</p>
          <p>Please click on Step 3 to schedule your home check with a TAP team member.</p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>`,
    REJECT: (name) => `<p>Hello, ${name}</p>
          <br />
          <p>Unfortunately, you did not pass the initial interview and do not match the type of foster TAP is looking for.</p>
          <p>You may contact the TAP team and re-apply after some time.</p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>`,
  },
  HOME_SCREEN: {
    PASS: (name) => `<p>Hello, ${name}</p>
          <br />
          <p>Congratulations!! Your home screen was a success, you have passed Step 3!</p>
          <p>Please click on Step 4 to move to your foster matching process.</p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>`,
    REJECT: (name) => `<p>Hello, ${name}</p>
          <br />
          <p>Unfortunately, you did not pass the home screen due to the following reasons:</p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>You may contact the TAP team if you have any further concerns.</p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>`,
    CONTINGENT: (name) => `<p>Hello, ${name}</p>
          <br />
          <p>Thank you for taking the time to conduct our home check, after careful consideration, there are a few problems we would like you to fix:</p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>After these problems are fixed, please email kristin@TAP.com to schedule your next home check.</p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>`,
  },
  MEET_AND_GREET: {
    CONFIRM: (name) => `<p>Hello, ${name}</p>
          <br />
          <p>The TAP team has matched you with ___ as your next foster!</p>
          <br />
          <p>Click anywhere on this card to schedule your meet and greet with Skippy!</p>
          <br />
          <p>Best,</p>
          <p>The Animal Pad Team</p>`,
  },
  FOSTER_IN_HOME: {
    CONFIRM: (name) => `<p>Hello, ${name}</p>
      <br />
      <p>Congratulations!! Your Meet & Greet was a success, you have been passed step 5 and are now a TAP foster!</p>
      <br />
      <p>Please click on Step 6 to communicate with us during your time fostering.</p>
      <br />
      <p>Best,</p>
      <p>The Animal Pad Team</p>
      `,
  },
};

export default FOSTER_EVALUATION_INITIAL_MESSAGES;

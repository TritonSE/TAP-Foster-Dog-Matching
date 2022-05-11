/**
 * Contact page that allows fosters to send messages to different admin departments
 *
 *
 * @summary     Contact page implementation
 * @author      Parth Patel
 *
 * #TODO Send message needs to be functional
 */

import React, { useState } from "react";
import "../css/contactStyles.css";
import cancel from "../images/cancel.png";
import smallCancel from "../images/smallCancel.png";
import Select from "../components/Select";
import DefaultBody from "../components/DefaultBody";
// const { sendEmail } = require("../../../routes/services/mailer");

function ContactUs() {
  const [continued, setContinued] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sent, setSent] = useState(false);
  const noRecipient = "Please select a team to contact.";
  const emptyText = "Message body cannot be blank.";
  const [value, setValue] = React.useState("");

  const toSelect = [
    { label: "General", value: "General" },
    { label: "Vetting Team", value: "Vetting Team" },
    { label: "Foster Team", value: "Foster Team" },
    { label: "Adoption Team", value: "Adoption Team" },
  ];

  const continueDecide = () => {
    // Only continue if department is selected
    if (value === "") {
      setErrorMessage(noRecipient);
    } else {
      setContinued(true);
      setSent(false);
      setInputMessage("");
      setErrorMessage("");
    }
  };

  const handleSelect = React.useCallback((val) => {
    setValue(val);
  }, []);

  const sendMessage = () => {
    if (inputMessage === "") {
      setErrorMessage(emptyText);
    } else {
      setErrorMessage("");
      setInputMessage("");
      setSent(true);
      // Send message to backend
    }
  };

  return (
    <DefaultBody>
      <div className="wrapper">
        {!continued ? (
          <>
            <div className="noTeamError">
              <p>{errorMessage}</p>
            </div>
            <div className="contactLanding">
              <p className="helpQuestion">What do you need help on?</p>

              <div className="selection">
                <Select
                  value={value}
                  options={toSelect}
                  onChange={handleSelect}
                  placeholder="Select your option"
                  height="4vh"
                  backgroundColor="#C6C6C6"
                />
              </div>
              <button type="button" className="continueButton" onClick={() => continueDecide()}>
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="noInputError">
              <p>{errorMessage}</p>
            </div>
            <div className="newMessage">
              <div className="topBar">
                <p>New Message</p>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => {
                    setContinued(false);
                    setErrorMessage("");
                  }}
                >
                  <img className="cancelImg" src={cancel} alt="cancel button" />
                </button>
              </div>
              <div className="selection2">
                <Select
                  value={value}
                  options={toSelect}
                  onChange={handleSelect}
                  placeholder="Select your option"
                  height="4vh"
                  backgroundColor="#C6C6C6"
                />
              </div>
              <textarea
                className="inputArea"
                placeholder="Message Here"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />

              <button type="button" className="sendButton" onClick={sendMessage}>
                Send
              </button>
              {sent ? (
                <div className="messageReceived">
                  <button type="button" className="smallCancel" onClick={() => setSent(false)}>
                    <img src={smallCancel} alt="cancel button" />
                  </button>
                  <div className="message">
                    <p>Thank you! Your message has been sent.</p>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          </>
        )}
      </div>
    </DefaultBody>
  );
}

export default ContactUs;

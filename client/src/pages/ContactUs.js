import React, { useState } from "react";
import "./contactStyles/contactStyles.css";
import cancel from "./contactStyles/cancel.png";
import smallCancel from "./contactStyles/smallCancel.png";
import Select from "../components/Select";

function ContactUs() {
  const [continued, setContinued] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [sent, setSent] = useState(false);

  const toSelect = [
    { label: "General", value: "General" },
    { label: "Vetting Team", value: "Vetting Team" },
    { label: "Foster Team", value: "Foster Team" },
    { label: "Adoption Team", value: "Adoption Team" },
  ];

  const continueDecide = () => {
    setContinued(true);
    setSent(false);
  };

  const sendMessage = () => {
    setSent(true);
    // Send message to backend
  };

  const [value, setValue] = React.useState("");

  const handleSelect = React.useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <div>
      {!continued ? (
        <div className="contactLanding">
          <p className="helpQuestion">What do you need help on?</p>

          <div className="selection">
            <Select
              value={value}
              options={toSelect}
              onChange={handleSelect}
              placeholder="Select your option"
            />
          </div>
          <button type="button" className="continueButton" onClick={() => continueDecide()}>
            Continue
          </button>
        </div>
      ) : (
        <div className="newMessage">
          <div className="topBar">
            <p>New Message</p>
            <button type="button" className="cancel" onClick={() => setContinued(false)}>
              <img src={cancel} />
            </button>
          </div>

          <div className="selection2">
            <Select
              value={value}
              options={toSelect}
              onChange={handleSelect}
              placeholder="Select your option"
            />
          </div>
          <textarea
            className="inputArea"
            placeholder="Message Here"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="button" className="sendButton" onClick={sendMessage}>
            Send
          </button>

          {sent ? (
            <div className="messageReceived">
              <button type="button" className="smallCancel" onClick={() => setSent(false)}>
                <img src={smallCancel} />
              </button>
              <p className="message">Thank you! Your message has been sent.</p>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}

export default ContactUs;

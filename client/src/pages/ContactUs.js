import React, { useState, useEffect } from "react";
import "./contactStyles/contactStyles.css";
import cancel from "./contactStyles/cancel.png";
import smallCancel from "./contactStyles/smallCancel.png";

function ContactUs() {
  const [continued, setContinued] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [selection, setSelection] = useState("");
  const items = ["General", "Vetting Team", "Foster Team", "Adoption Team"];
  
  useEffect(() => {
    console.log(inputMessage);
  }, [inputMessage])

  const continueDecide = () => {
    if (selection!== "") {
      setContinued(true);
      setSent(false);
    }
  }

  const sendMessage = () => {
    setSent(true);
    console.log(selection);
    // Send message to backend
  };

  return (
    <>
      {!continued ? (
        <div className="contactLanding">
          <div className="contactInfo">
            <p className="helpQuestion">What do you need help on?</p>

            <select
              className="selection"
              name="help"
              id="help"
              onChange={() => setSelection(event.target.options[event.target.selectedIndex].text)}
            >
              <option value="" disabled selected>
                Select your option
              </option>
              {items.map((item) =>
                selection === item ? (
                  <option value={item} selected="selected">
                    {item}
                  </option>
                ) : (
                  <option value={item}>{item}</option>
                )
              )}
            </select>
          </div>
          <button className="continueButton" onClick={() => continueDecide()}>
            Continue
          </button>
        </div>
      ) : (
        <div className="newMessage">
          <div className="topBar">
            <p>New Message</p>
            <button className="cancel" onClick={() => setContinued(false)}>
              <img src={cancel} />
            </button>
          </div>
          <select
            className="selection2"
            name="help"
            id="help"
            onChange={() => setSelection(event.target.options[event.target.selectedIndex].text)}
          >
            <option value="" disabled selected>
              Select your option
            </option>

            {items.map((item) =>
                selection === item ? (
                  <option value={item} selected="selected">
                    {item}
                  </option>
                ) : (
                  <option value={item}>{item}</option>
                )
              )}
          </select>
          <textarea
            className="inputArea"
            placeholder="Message Here"
            onChange={(event) => setInputMessage(event.target.value)}
          />
          <button className="sendButton" onClick={sendMessage}>
            Send
          </button>

          {sent ? (
            <div className="messageReceived">
              <button className="smallCancel" onClick={() => setSent(false)}>
                <img src={smallCancel} />
              </button>
              <p>Thank you! Your message has been sent.</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}

export default ContactUs;

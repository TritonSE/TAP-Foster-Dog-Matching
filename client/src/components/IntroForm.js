/**
 * IntroForm Component
 *
 * @summary  Reusable form component for the landing, login and register page, with a custom header.
 * @author   Artyom Muradyan
 *
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { getAuthErrorMessage, signInUser } from "../services/auth";

function IntroForm(props) {
  let content;
  const navigate = useNavigate();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();

  const handleSignIn = () => {
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    signInUser(email, password)
      .then(() => {
        setError();
        // Send user back to the home page. Router handles the default page the user sees.
        navigate("/");
      })
      .catch((e) => setError(getAuthErrorMessage(e.code)));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  switch (props.formType) {
    case "landing": {
      content = (
        <>
          <div className="form-landing-question">Are you a...</div>
          <Button
            className="foster"
            name="Foster"
            onClick={() => navigate("/login", { state: { type: "Foster" } })}
          />
          <Button
            className="admin"
            name="Admin"
            onClick={() => navigate("/login", { state: { type: "Admin" } })}
          />
        </>
      );
      break;
    }
    case "login": {
      content = (
        <>
          <input
            type="email"
            className="login-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            className="login-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {error && <p className="error-message">{error}</p>}
          <Button className="login" name="Log In" onClick={handleSignIn} />
          <a href="/register" className="sign-up">
            Sign Up
          </a>
        </>
      );
      break;
    }
  }

  return (
    <div className="left-panel">
      <div className="form-container" id={"form-container-" + props.formType}>
        <b className="form-header" id={"form-header-" + props.formType}>
          {" "}
          {props.header}{" "}
        </b>
        {content}
      </div>
      <div className="copyright-mobile">
        © 2020 The Animal Pad | All rights reserved
        <div>The Animal Pad is a 501c3 Organization EIN #45-4902841.</div>
      </div>
    </div>
  );
}

export default IntroForm;

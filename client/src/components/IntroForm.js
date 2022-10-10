/**
 * Form Component
 *
 * @summary  Reusable form component for the landing, login and register page, with a custom header.
 * @author   Artyom Muradyan
 *
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { getAuthErrorMessage, signInUser } from "../services/auth";
import { createAdmin } from "../services/admins";
import { createUser } from "../services/users";

const ADMIN_SIGN_UP_KEYS = {
  management: process.env.REACT_APP_MANAGEMENT_SIGN_UP_KEY || "12345",
  ambassador: process.env.REACT_APP_AMBASSADOR_SIGN_UP_KEY || "12345",
  coordinator: process.env.REACT_APP_COORDINATOR_SIGN_UP_KEY || "12345",
};

function IntroForm(props) {
  let content;
  const navigate = useNavigate();
  const [formType, setFormType] = React.useState(props.formType);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [role, setRole] = React.useState();
  const [error, setError] = React.useState();
  const [signupKey, setSignupKey] = React.useState();

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

  const handleSignUp = () => {
    if (!firstName) {
      setError("Please enter a first name.");
      return;
    }
    if (!lastName) {
      setError("Please enter a last name.");
      return;
    }
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    if (props.accountType === "Admin") {
      if (!role) {
        setError("Please select a role.");
        return;
      }
      newUser.role = role;
      // Advance to the signup key page
      if (formType === "signup") {
        // Initial validation of fields
        newUser.validateOnly = true;
        createAdmin(newUser).then((response) => {
          if (!response.ok) {
            setError(response.data.message);
          } else {
            setError();
            setFormType("signup-key");
          }
        });
        return;
      }
      // Check if sign up key is correct
      if (ADMIN_SIGN_UP_KEYS[role] !== signupKey) {
        setError("Invalid sign up key.");
        return;
      }
    }

    (props.accountType === "Admin" ? createAdmin : createUser)(newUser).then((response) => {
      if (!response.ok) {
        setError(response.data.message);
      } else {
        setError();
        navigate("/login", {
          state: { accountType: props.accountType, signUpSuccessful: true },
        });
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (props.formType === "login") handleSignIn();
      else if (props.formType === "signup") handleSignUp();
    }
  };

  switch (formType) {
    case "landing": {
      content = (
        <>
          <div className="form-landing-question">Are you a...</div>
          <Button
            className="foster"
            name="Foster"
            onClick={() => navigate("/login", { state: { accountType: "Foster" } })}
          />
          <Button
            className="admin"
            name="Admin"
            onClick={() => navigate("/login", { state: { accountType: "Admin" } })}
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
          <Link to="/register" state={{ accountType: props.accountType }} className="sign-up">
            Sign Up
          </Link>
        </>
      );
      break;
    }
    case "signup": {
      if (props.accountType === "Admin") {
        content = (
          <>
            <div className="form-signup-question"> I am a... </div>
            <select className="selector" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="management">Management</option>
              <option value="ambassador">Ambassador</option>
              <option value="coordinator">Coordinator</option>
            </select>
            <input
              className="signup-first-name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              className="signup-last-name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="email"
              className="signup-email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="password"
              className="signup-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="password"
              className="signup-re-password"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {error && <p className="error-message">{error}</p>}
            <Button className="signup" name="Continue" onClick={handleSignUp} />
            <Link to="/login" state={{ accountType: props.accountType }} className="log-in">
              Log In
            </Link>
          </>
        );
      } else if (props.accountType === "Foster") {
        content = (
          <>
            <input
              className="signup-first-name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              className="signup-last-name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="email"
              className="signup-email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="password"
              className="signup-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="password"
              className="signup-re-password"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {error && <p className="error-message">{error}</p>}
            <Button className="signup" name="Continue" onClick={handleSignUp} />
            <Link to="/login" state={{ accountType: props.accountType }} className="log-in">
              Log In
            </Link>
          </>
        );
      }

      break;
    }
    case "signup-key": {
      content = (
        <>
          <a className="back-to-register" onClick={() => setFormType("signup")}>
            Back
          </a>
          <div className="form-signup-key-text">
            {" "}
            Please enter the correct {props.accountType} sign up key to complete account creation.{" "}
          </div>
          <div className="key-input">
            <input
              type="text"
              value={signupKey}
              maxLength={5}
              onChange={(e) => setSignupKey(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button className="confirm" name="Confirm" onClick={handleSignUp} />
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
        {props.showSignUpSuccessMessage && (
          <p className="signup-success">Successfully signed up. Please log in.</p>
        )}
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

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

const ADMIN_SIGN_UP_KEY = ["1", "1", "1", "1", "1"];

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
  // Signup Key Page States
  const [key1, setKey1] = React.useState();
  const [key2, setKey2] = React.useState();
  const [key3, setKey3] = React.useState();
  const [key4, setKey4] = React.useState();
  const [key5, setKey5] = React.useState();

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
        setError();
        setFormType("signup-key");
        return;
      }
      // Check if sign up key is correct
      const keys = [key1, key2, key3, key4, key5];
      for (let i = 0; i < 5; i++) {
        if (ADMIN_SIGN_UP_KEY[i] !== keys[i]) {
          setError("Invalid sign up key.");
          return;
        }
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
              maxLength="1"
              id="key-1"
              value={key1}
              onChange={(e) => setKey1(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              id="key-2"
              value={key2}
              onChange={(e) => setKey2(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              id="key-3"
              value={key3}
              onChange={(e) => setKey3(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              id="key-4"
              value={key4}
              onChange={(e) => setKey4(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              id="key-5"
              value={key5}
              onChange={(e) => setKey5(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button className="confirm" name="Confirm" onClick={handleSignUp} />
        </>
      );

      window.onload = () => {
        const key1Input = document.getElementById("key-1");
        const key2Input = document.getElementById("key-2");
        const key3Input = document.getElementById("key-3");
        const key4Input = document.getElementById("key-4");
        const key5Input = document.getElementById("key-5");

        key1Input.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key1Input.value = "";
          } else {
            key2Input.focus();
          }
        });
        key2Input.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key2Input.value = "";
            key1Input.focus();
          } else {
            key3Input.focus();
          }
        });
        key3Input.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key3Input.value = "";
            key2Input.focus();
          } else {
            key4Input.focus();
          }
        });
        key4Input.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key4Input.value = "";
            key3Input.focus();
          } else {
            key5Input.focus();
          }
        });
        key5Input.addEventListener("keyup", (e) => {
          if (e.key === "Backspace") {
            key5Input.value = "";
            key4Input.focus();
          }
        });
      };

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

import React from "react";
import Button from "./Button";
import "../styles/login.css";

function LoginForm(props) {
  return (
    <div className="left-panel">
      <div className="form-container">
        <b className="form-header">{props.loginType} Log in</b>
        <input type="email" className="login-email" name="email" placeholder="Email" />
        <input type="password" className="login-password" name="password" placeholder="Password" />
        {/* TODO: Make Login button work */}
        <Button class="login" name="Log In" />
        <a href="/register" className="sign-up">
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default LoginForm;

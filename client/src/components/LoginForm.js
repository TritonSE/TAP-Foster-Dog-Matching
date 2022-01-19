import React from "react";
import Button from "./Button";
import "../styles/form.css";

function LoginForm(props) {
  return (
    <div className="form-container">
      <b className="form-header" />
      <div className="form-title">{props.loginType} Login</div>
      <form>
        <input type="email" className="login-email" name="email" placeholder="Email" />
        <input type="password" className="login-password" name="password" placeholder="Password" />
      </form>
      <Button style={props.loginButtonStyle} name="Log In" />
      {/* <a className="sign-up-link">Sign Up</a> */}
    </div>
  );
}

export default LoginForm;

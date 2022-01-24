import React from "react";
import Header from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import dog from "../images/dog.png";

function Login() {
  return (
    <div>
      <Header />
      <div>
        <LoginForm loginType="Foster" />
        <div className="right-panel">
          <img className="dog-image" src={dog} alt="Cute dog!" />
          <div className="copyright">
            © 2020 The Animal Pad | All rights reserved
            <div>The Animal Pad is a 501c3 Organization EIN #45-4902841.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import dog from "../images/dog.png";

function Login() {
  return (
    <div>
      <Header />
      <div>
        <LoginForm />
        <div className="landing-right-panel">
          <img className="dog-image" src={dog} alt="Cute dog!" />
          <div className="copyright">
            © 2020 The Animal Pad | All rights reserved The Animal Pad is a 501c3 Organization EIN
            #45-4902841.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

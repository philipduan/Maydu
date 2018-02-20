import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';
import './styles.css';

const Layout = () => {
  return (
    <div className="Login-Container">
      <div class="Login-Box">
        <h3> MayDu </h3>
        <div class="Login-Box-Inputs">
          <input type="email" placeholder="Email" className="Email-Input" />
          <input type="password" placeholder="Password" className="Password-Input" />
        </div>
        <button type="submit" className="Sign-In-Submit"> Sign In </button>
        <p> Don't have an account? </p>
        <button type="submit" className="Create-Account-Submit"> Create An Account </button>
      </div>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <SignUp />
      </div>
    );
  }
}

export default App;

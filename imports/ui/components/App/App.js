import React from 'react';
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

export default Layout;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import './styles.css';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  //SignIn Methods
  //Setting state of user email and passworld on each keystroke
  handleEmailAndPasswordState = event => {
    event.preventDefault();
    this.setState({
      email: this.emailInput.value,
      password: this.passwordInput.value
    });
  };

  //Checking DB if the user and password match - if no user exists or their password is inncorect, throw an error
  handleSignInSubmit = event => {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.email, this.state.password, err => {
      if (err) {
        this.setState({ error: `${err.reason}, please try again!` });
      } else {
        this.props.history.push('/sessions');
      }
    });
  };

  render() {
    return (
      <div className="Login-Container">
        <h3> MayDu </h3>
        <form onSubmit={this.handleSignInSubmit}>
          <input
            onChange={this.handleEmailAndPasswordState}
            ref={input => (this.emailInput = input)}
            type="email"
            placeholder="Email Address"
            className="Email-Input"
          />
          <input
            onChange={this.handleEmailAndPasswordState}
            ref={input => (this.passwordInput = input)}
            type="password"
            placeholder="Password"
            className="Password-Input"
          />
          <p id="signin-error-message"> {this.state.error} </p>
          <button type="submit" className="Sign-In-Submit">
            Sign In
          </button>
        </form>
        <div className="Create-Account-SignIn">
          <p> Don't have an account? </p>
          <Link className="Create-Account" to={`/signup`}>
            {' '}
            Sign Up Now{' '}
          </Link>
        </div>
      </div>
    );
  }
}

export default SignIn;

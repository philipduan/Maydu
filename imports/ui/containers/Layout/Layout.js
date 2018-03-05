import React, { Component } from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    Meteor.logout(err => {
      if (err) {
        console.log('user no logged out', err);
      } else {
        console.log('user successfully logged out');
        this.props.history.push('/');
      }
    });
  }

  render() {
    console.log('user id', Meteor.user());
    return (
      <div className="Header-Container">
        <h1
          onClick={() => this.props.history.push('/sessions')}
          className="Header-Title"
        >
          MayDu
        </h1>
        <div className="Header-Button-Div">
          <button
            onClick={() => this.props.history.push(`/user/${Meteor.userId()}`)}
            className="Header-profile"
          >
            <i className="fas fa-user" />
            &nbsp;
            {window.innerWidth > 1023 ? <p>&nbsp;&nbsp;My Profile</p> : null}
          </button>
          <button onClick={this.handleSignOut} className="Header-signout">
            <i className="fas fa-sign-out-alt" />
            &nbsp;
            {window.innerWidth > 1023 ? <p>&nbsp;&nbsp;Logout</p> : null}
          </button>
        </div>
      </div>
    );
  }
}

const Layout = ({ children, history }) => {
  return (
    <div>
      {Meteor.userId() ? <Header history={history} /> : null}
      <div>{children}</div>
    </div>
  );
};

export default withRouter(Layout);

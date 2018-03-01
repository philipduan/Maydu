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
                console.log('user no logged out', err)
            } else {
                console.log('user successfully logged out');
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
            <div className="Header-Container">
                <h1 className="Header-Title"> <Link to={'/sessions'}> MayDu </Link> </h1>
                <div className="Header-Button-Div">
                    <button className="Header-Buttons"> <Link to={'/user/:id'}>My Profile</Link> </button>
                    <button onClick={this.handleSignOut} className="Header-Buttons"> SignOut </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);

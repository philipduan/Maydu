import React, { Component } from 'react';
import './styles.css';
import { Meteor } from 'meteor/meteor';

class Profile extends Component {
    constructor(props) {
        super(props);
        //Placeholder user - delete when we have users 
        this.profile = {
            fullName: 'Carlos Reyes',
            photo: 'https://ath.unileverservices.com/wp-content/uploads/sites/4/2016/07/ashton-kutcher-long-hair-brown.jpg',
            major: 'Computer Science',
            year: 'Fourth',
            institution: 'York University',
            bio: 'Hi, my name is carlos and overall I\'m just a legend. To be more specific, I kill the game when it comes tocoding - specifically with javascript. I shred on theslopes and only have 7 toes... true story. Anyways,this is my bio.',
            postedSessions: [],
            acceptedSessions: []
        }
        this.state = {
            postSessions: [],
            acceptedSessions: [],
            edit: false,
            editProfile: {
                fullName: this.profile.fullName,
                //rest of profile fields 
            }
        }
        this.user = Meteor.user();
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleUpdatedFields = this.handleUpdatedFields.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    //Generating random session id's
    //When ready for dynamic data - const user = Meteor.User(); 
    //user.profile.postedSessions
    componentDidMount() {
        for (let i = 0; i < 3; i++) {
            let sessionId = 'SessionID: ' + Math.floor(Math.random() * 200000000) + ' ';
            this.profile.postedSessions.push(sessionId);
        }
        for (let i = 0; i < 3; i++) {
            let sessionId = 'SessionID: ' + Math.floor(Math.random() * 200000000) + ' ';
            this.profile.acceptedSessions.push(sessionId);
        }
        this.checkUserSessions()
        this.checkUserAcceptedSessions()
    }

    // if user has sessions display them using <SessionCard />
    checkUserSessions() {
        if (this.profile.postedSessions.length <= 0) {
            ''
        } else if (this.profile.postedSessions.length >= 3) {
            return this.setState({ postSessions: this.profile.postedSessions });
        }
    }

    checkUserAcceptedSessions() {
        if (this.profile.acceptedSessions.length <= 0) {
            ''
        } else if (this.profile.postedSessions.length >= 3) {
            return this.setState({ acceptedSessions: this.profile.acceptedSessions });
        }
    }

    handleEditProfile(event) {
        event.preventDefault();
        this.setState({ edit: true });
    }

    handleUpdatedFields(event) {
        event.preventDefault();
        this.setState({
            editProfile: {
                fullName: event.target.value,
                //rest of editProfile object 
            }
        });
    }

    handleUpdate(event) {
        event.preventDefault();
        this.setState({
            edit: false
        });
    }

    render() {
        return (
            <div className="Profile-Container">
                <div className="Header-Placeholder">
                    Header stuff
                </div>
                <div className="Profile-Box-Outer">
                    <div className="Profile-Box">
                        <div className="Profile-Picture">
                            <img src={this.profile.photo}
                            />
                        </div>
                        <a onClick={this.state.edit === false ? this.handleEditProfile : this.handleUpdate} href="#" id="Edit-Profile"> {this.state.edit === false ? 'Edit Profile' : 'Update Profile'}</a>
                        {this.state.edit === false ? <h3> {this.state.editProfile.fullName} </h3> : <input type="text" placeholder={this.state.editProfile.fullName} onChange={this.handleUpdatedFields} />}
                        <h6> {`${this.profile.institution} ` + `~ ${this.profile.major}` + ` ~ ${this.profile.year} Year`} </h6>
                        <p> {this.profile.bio} </p>
                        <h5> My Session's  </h5>
                        <p> {this.state.postSessions <= 0 ? 'You haven\'t posted any sessions yet!' : this.state.postSessions} </p>
                        <h5> Accepted Sessions </h5>
                        <p> {this.state.acceptedSessions <= 0 ? 'You haven\'t been accepted to any sessions yet!' : this.state.acceptedSessions} </p>
                    </div>
                </div>
            </div >
        );
    }
}

export default Profile;
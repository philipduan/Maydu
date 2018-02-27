import React, { Component } from 'react';
import './styles.css';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../Layout/Layout';
import index from 'material-ui/Card';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            editProfile: {
                fullName: '',
                major: '',
                academicYear: '',
                institution: '',
                //imageURL: Aseel, here's where you come in! :) 
                bio: '',
                acceptedSessions: [],
                pendingSessions: [],
                createdSessions: []
            }
        }
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleUpdatedFields = this.handleUpdatedFields.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            console.log(nextProps.user.profile);
            this.setState({
                editProfile: {
                    fullName: nextProps.user.profile.fullName,
                    major: nextProps.user.profile.major,
                    academicYear: nextProps.user.profile.academicYear,
                    institution: nextProps.user.profile.institution,
                    bio: nextProps.user.profile.bio
                }
            })
            // this.checkUserSessions()
            // this.checkUserAcceptedSessions()
        }
    }


    // if user has sessions display them using <SessionCard />
    // checkUserSessions() {
    //     if (this.profile.postedSessions.length <= 0) {
    //         ''
    //     } else if (this.profile.postedSessions.length >= 3) {
    //         return this.setState({ postSessions: this.profile.postedSessions });
    //     }
    // }

    // checkUserAcceptedSessions() {
    //     if (this.profile.acceptedSessions.length <= 0) {
    //         ''
    //     } else if (this.profile.postedSessions.length >= 3) {
    //         return this.setState({ acceptedSessions: this.profile.acceptedSessions });
    //     }
    // }

    handleEditProfile(event) {
        event.preventDefault();
        this.setState({ edit: true });
    }

    handleUpdatedFields(event) {
        event.preventDefault();
        this.setState({
            editProfile: {
                fullName: event.target.value,
                major: event.target.value,
                academicYear: event.target.value,
                institution: event.target.value,
                bio: event.target.value
                // imageURL: Aseel, here's where you come in :) 
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
                    <Header />
                </div>
                <div className="Profile-Box-Outer">
                    <div className="Profile-Box">
                        <div className="Profile-Picture">
                            <img src=""
                            />
                        </div>
                        <a onClick={this.state.edit === false ? this.handleEditProfile : this.handleUpdate} href="#" id="Edit-Profile"> {this.state.edit === false ? 'Edit Profile' : 'Update Profile'}</a>
                        {this.state.edit === false ? <h3> {this.state.editProfile.fullName} </h3> : <input id="Edit-Update-FullName" type="text" placeholder={this.state.editProfile.fullName} onChange={this.handleUpdatedFields} />}
                        <div className="School-Info">
                            {this.state.edit === false ? <p className="Edit-Profile-SchoolInfo"> {this.state.editProfile.institution} </p> : <input className="Edit-Update-SchoolInfo" type="text" placeholder={this.state.editProfile.institution} onChange={this.handleUpdatedFields} />}
                            {this.state.edit === false ? <p className="Edit-Profile-SchoolInfo"> {this.state.editProfile.academicYear} </p> : <input className="Edit-Update-SchoolInfo" type="text" placeholder={this.state.editProfile.academicYear} onChange={this.handleUpdatedFields} />}
                            {this.state.edit === false ? <p className="Edit-Profile-SchoolInfo"> {this.state.editProfile.major} </p> : <input className="Edit-Update-SchoolInfo" type="text" placeholder={this.state.editProfile.major} onChange={this.handleUpdatedFields} />}
                        </div>
                        {this.state.edit === false ? <p className="Edit-Profile-Bio"> {this.state.editProfile.bio} </p> : <input className="Edit-Update-Bio" type="text" placeholder={this.state.editProfile.bio} onChange={this.handleUpdatedFields} />}
                        <h5> My Session's  </h5>
                        {/* <p> {this.state.postSessions <= 0 ? 'You haven\'t posted any sessions yet!' : this.state.postSessions} </p> */}
                        <h5> Accepted Sessions </h5>
                        {/* <p> {this.state.acceptedSessions <= 0 ? 'You haven\'t been accepted to any sessions yet!' : this.state.acceptedSessions} </p> */}
                    </div>
                </div>
            </div >
        );
    }
}

export default withTracker((props) => {
    const id = props.match.params.id
    const user = Meteor.users.findOne({ _id: id })

    return {
        user: user ? user : ''
    }
})(Profile);
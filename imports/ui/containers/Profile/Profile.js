import React, { Component } from 'react';
import './styles.css';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../Layout/Layout';
import index from 'material-ui/Card';
import SessionCard from '../SessionFeed/SessionCard';
import { connect } from 'react-redux';

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
    };
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
      });
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
    console.log('MOMENT O TRUTH', this.props.profileData);
    return (
      <div className="Profile-Container">
        <h3>{this.state.editProfile.fullName}</h3>
        <div className="User-Container">
          <div className="Profile-Picture">
            <img src="https://media.licdn.com/dms/image/C4D03AQGmcZ4ZQERkGQ/profile-displayphoto-shrink_200_200/0?e=1525201200&v=alpha&t=6OQtFwFcdFnMPTqIVuTfnh6ot6APAurrEam3vt6yvSQ" />
            {Meteor.userId() ? <button onClick={() => console.log('hi')}> Edit Profile </button> : ''}
          </div>
          <div className="User-Content">
            <p className="User-Institution"> {this.state.editProfile.institution} </p>
            <p className="User-Major-Year"> {this.state.editProfile.major} | {this.state.editProfile.academicYear} </p>
            <p className="User-Bio"> {this.state.editProfile.bio} </p>
          </div>
        </div>
        <h3 className="Accepted-Sessions-Title"> Accepted Sessions </h3>
        {/* Accepted Sessions  */}
        <div className="User-Accepted-Sessions-Container">
          <div className="Session-Container">

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.profileData.profileData
})

const reduxProfile = connect(mapStateToProps)(Profile);


export default withTracker(props => {
  const id = props.match.params.id;
  const user = Meteor.users.findOne({ _id: id });

  return {
    user: user ? user : ''
  };
})(reduxProfile);

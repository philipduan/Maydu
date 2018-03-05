import React, { Component } from 'react';
import './styles.css';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../Layout/Layout';
import index from 'material-ui/Card';
import SessionCard from '../SessionFeed/SessionCard';
import { connect } from 'react-redux';
import { Sessions } from '../../../api/Sessions';

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

  componentDidMount() {
    if (this.props.user) {
      const { user } = this.props;
      console.log('will mount');

      console.log('inside if');
      Promise.all([
        Sessions.find({
          _id: { $in: user.profile.createdSessions }
        }).fetch(),
        Sessions.find({
          _id: { $in: user.profile.pendingSessions }
        }).fetch(),
        Sessions.find({
          _id: { $in: user.profile.acceptedSessions }
        }).fetch()
      ]).then(data => {
        const [createdSessions, pendingSessions, acceptedSessions] = data;
        console.log(data);
        this.setState({
          editProfile: {
            fullName: user.profile.fullName,
            major: user.profile.major,
            academicYear: user.profile.academicYear,
            institution: user.profile.institution,
            bio: user.profile.bio,
            createdSessions: createdSessions,
            pendingSessions: pendingSessions,
            acceptedSessions: acceptedSessions
          }
        });
      });
    }
  }

  componentWillUpdate(nextProps) {
    console.log('will Update', nextProps);
    console.log(this.props.user, this.state);
    if (this.state.editProfile.fullName !== nextProps.user.profile.fullName) {
      console.log('inside if');
      Promise.all([
        Sessions.find({
          _id: { $in: nextProps.user.profile.createdSessions }
        }).fetch(),
        Sessions.find({
          _id: { $in: nextProps.user.profile.pendingSessions }
        }).fetch(),
        Sessions.find({
          _id: { $in: nextProps.user.profile.acceptedSessions }
        }).fetch()
      ]).then(data => {
        const [createdSessions, pendingSessions, acceptedSessions] = data;
        console.log(data);
        this.setState({
          editProfile: {
            fullName: nextProps.user.profile.fullName,
            major: nextProps.user.profile.major,
            academicYear: nextProps.user.profile.academicYear,
            institution: nextProps.user.profile.institution,
            bio: nextProps.user.profile.bio,
            createdSessions: createdSessions,
            pendingSessions: pendingSessions,
            acceptedSessions: acceptedSessions
          }
        });
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
    console.log(this.state);
    return (
      <div className="Profile-Container">
        <h3>{this.state.editProfile.fullName}</h3>
        <div className="User-Container">
          <div className="Profile-Picture">
            <img src="http://www.sciencerendezvousuoft.ca/wp-content/uploads/2017/03/Headshot-Placeholder.jpg" />
          </div>
          <div className="User-Content">
            <p className="User-Institution">
              {' '}
              {this.state.editProfile.institution}{' '}
            </p>
            <p className="User-Major-Year">
              {' '}
              {this.state.editProfile.major} |{' '}
              {this.state.editProfile.academicYear}{' '}
            </p>
            <p className="User-Bio"> {this.state.editProfile.bio} </p>
          </div>
        </div>
        <h3 className="Accepted-Sessions-Title"> Created Sessions </h3>
        <div className="User-Accepted-Sessions-Container">
          <div className="Session-Container">
            {this.state.editProfile.createdSessions &&
            this.state.editProfile.createdSessions.length > 0 ? (
              this.state.editProfile.createdSessions.map((session, index) => (
                <SessionCard key={index} data={session} pending={false} />
              ))
            ) : (
              <p className="empty-message">
                {' '}
                You haven't created any sessions yet!{' '}
              </p>
            )}
          </div>
        </div>

        <h3 className="Accepted-Sessions-Title"> Accepted Sessions </h3>
        <div className="User-Accepted-Sessions-Container">
          <div className="Session-Container-Accepted" />
          {this.state.editProfile.acceptedSessions &&
          this.state.editProfile.acceptedSessions.length > 0 ? (
            this.state.editProfile.acceptedSessions.map((session, index) => (
              <SessionCard key={index} data={session} pending={false} />
            ))
          ) : (
            <p className="empty-message">
              {' '}
              You don't have any accepted sessions yet!{' '}
            </p>
          )}
        </div>

        <h3 className="Accepted-Sessions-Title"> Pending Sessions </h3>
        <div className="User-Accepted-Sessions-Container">
          <div className="Session-Container-Pending">
            {this.state.editProfile.pendingSessions &&
            this.state.editProfile.pendingSessions.length > 0 ? (
              this.state.editProfile.pendingSessions.map((session, index) => (
                <SessionCard key={index} data={session} pending={false} />
              ))
            ) : (
              <p className="empty-message">
                {' '}
                You don't have any pending sessions, people must really like
                you!{' '}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   profileData: state.profileData.profileData
// })

// const reduxProfile = connect(mapStateToProps)(Profile);

export default withTracker(props => {
  Meteor.subscribe('sessions');
  const id = props.match.params.id;
  const user = Meteor.users.findOne({ _id: id });
  return {
    user: user ? user : ''
  };
})(Profile);

import React, { Component } from 'react';
import SessionCard from './SessionCard';
import SessionList from './SessionList';
import SessionFilter from './SessionFilter';
import './style.css';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessions } from '../../../api/Sessions';
import _ from 'lodash';
import Header from '../Layout/Layout';

PER_PAGE = 20;

// Find unique values in an array
Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

class SessionContainer extends Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      allCourseCodes: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ sessions: nextProps.sessions });
    console.log('props', nextProps.sessions);

    let courseCodes = [];
    nextProps.sessions.filter(session => {
      courseCodes.push(session.courseCode);
    });
    const allCourseCodes = courseCodes.unique();
    this.setState({
      allCourseCodes
    });
    console.log('state', this.state.sessions);
    console.log('codes', this.state.allCourseCodes);
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ sessions: this.props.sessions });
    //   console.log('props', this.props.sessions);
    //   let courseCodes = [];
    //   this.props.sessions.filter(session => {
    //     courseCodes.push(session.courseCode);
    //   });
    //   const allCourseCodes = courseCodes.unique();
    //   this.setState({
    //     allCourseCodes
    //   });
    //   console.log('state', this.state.sessions);
    //   console.log('codes', this.state.allCourseCodes);
    // }, 550);
  }
  handleFilter = event => {
    Meteor.call('sessions.filterByCourseCode', event, (error, sessions) => {
      if (sessions.length > 0 || sessions) {
        this.setState({ sessions });
        console.log(this.state.sessions, 'if state set triggered');
      } else {
        console.log('Error');
      }
    });
  };

  render() {
    if (this.props.currentUser) {
      console.log(this.props.currentUser, 'meteor user');
    }
    const { sessions } = this.state;

    return (
      <div className="sessionContainer">
        <h1 className="sessionHeader">Sessions</h1>
        <SessionFilter
          handleFilter={this.handleFilter}
          allCourseCodes={this.state.allCourseCodes}
        />
        {sessions ? <SessionList sessions={sessions} /> : null}
        <button
          className="create-session-link"
          onClick={() => this.props.history.push('/createsession')}
        >
          Create Session
        </button>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('sessions');
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    sessions: Sessions.find({}).fetch()
  };
}, SessionContainer);
// export default (SessionFeed = withTracker(() => {
//   const sessionsHandle = Meteor.subscribe('sessions');
//   const loading = !sessionsHandle.ready();
//   const seshs = Sessions.find({});
//   const sessionExists = !loading && !!seshs;
//   return {
//     loading,
//     seshs,
//     sessionExists,
//     sessions: sessionExists ? seshs.fetch() : []
//   };
// })(SessionContainer));

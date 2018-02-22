import React, { Component } from 'react';
import SessionCard from './SessionCard';
import { SessionList } from './SessionList';
import SessionFilter from './SessionFilter';
import './style.css';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessions } from '../../../api/Sessions';
import _ from 'lodash';

PER_PAGE = 20;

class SessionContainer extends Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      allCourseCodes: []
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ sessions: this.props.sessions });
      console.log('props', this.props.sessions);

      let allCourseCodes = [];

      this.props.sessions.filter(session => {
        if (_.intersection(session.courseCode, allCourseCodes).length > 0) {
          null;
        } else {
          allCourseCodes.push(session.courseCode);
        }
      });

      this.setState({
        allCourseCodes: allCourseCodes
      });
      console.log('state', this.state.sessions);
      console.log('codes', this.state.allCourseCodes);
    }, 550);
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
    const { sessions } = this.state;
    const sessionMap = sessions.map(session => {
      return <SessionCard key={session._id} data={session} />;
    });
   // console.log('sessionmap', sessionMap);

    return (
      <div>
        <SessionFilter
          handleFilter={this.handleFilter}
          allCourseCodes={this.state.allCourseCodes}
        />
        <SessionList>dsadas{sessionMap}</SessionList>
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

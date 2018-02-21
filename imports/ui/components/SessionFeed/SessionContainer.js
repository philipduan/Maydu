import React, { Component } from 'react';
import SessionCard from './SessionCard';
import SessionList from './SessionList';
import SessionFilter from './SessionFilter';
import './style.css';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
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
  componentWillMount() {
    console.log('props', this.props.sessions);
    this.setState({ sessions: this.props.sessions });
    let allCourseCodes = [];
    this.props.sessions.filter(session => {
      if (!_.intersection(session.courseCode, allCourseCodes)) {
        allCourseCodes.push(session.courseCode);
      }
    });
    this.setState({
      sessions: allCourseCodes
    });
  }
  handleFilter = value => {
    setTimeout(
      Meteor.call('sessions.filterByCourseCode', value, (err, sessions) => {
        this.setState({ sessions });
        console.log('Error', err);
      }),
      200
    );
  };

  render() {
    console.log(this.props.sessions);
    console.log('state', this.state.sessions);
    const { sessions } = this.state;

    return (
      <main>
        {/* <SessionList>
          {sessions.map(session => {
            return <SessionCard key={session._id} data={session} />;
          })}
        </SessionList> */}
      </main>
    );
  }
}

// export default withTracker(() => {
//   Meteor.subscribe('sessions');
//   return {
//     currentUser: Meteor.user(),
//     currentUserId: Meteor.userId(),
//     sessions: Sessions.find({}).fetch()
//   };
// }, SessionContainer);
export default (SessionFeed = withTracker(() => {
  const sessionsHandle = Meteor.subscribe('sessions');
  const loading = !sessionsHandle.ready();
  const seshs = Sessions.find({});
  const sessionExists = !loading && !!seshs;
  return {
    loading,
    seshs,
    sessionExists,
    sessions: sessionExists ? seshs.fetch() : []
  };
})(SessionContainer));

import React, { Component } from 'react';
import SessionCard from './SessionCard';
import SessionList from './SessionList';
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
    state = {
      sessions: [],
      allCourseCodes: []
    };
  }
  componentDidMount() {
    console.log('props', this.props.sessions);
    this.setState({ sessions: this.props.sessions });
    let allCourseCodes = [];
    this.props.sessions.filter(session => {
        let allCourseCodes = [];
        if (!_.intersection(session.courseCode, allCourseCodes)) {
            allCourseCodes.push(session.courseCode)
        }
        
      })
    this.setState({
      sessions: allCourseCodes
    });
  }
  handleFilter = value => {
    Meteor.call('sessions.filterByCourseCode', value, (err, sessions) => {
      this.setState({ sessions });
      console.log('Error', err);
    });
  };

  render() {
    const { sessions } = this.state;

    return (
      <main>
        <SessionList>
          {sessions.map(session => {
            return <SessionCard key={session._id} data={session} />;
          })}
        </SessionList>
      </main>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('session');
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    sessions: Sessions.find({}).fetch()
  };
}, SessionContainer);

import React, { Component } from 'react';
import SessionCard from './SessionCard';
import SessionList from './SessionList';
import './styles.css';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessions } from '../../../api/Sessions';

PER_PAGE = 20;

class SessionContainer extends Component {
  constructor() {
    super();
    state = {
      sessions: []
    };
  }
  componentDidMount() {
    this.setState({ sessions: this.props.sessions });
  }
  handleFilter =() => {
      Meteor.call('sessions.filterByCourseCode')
  }
  componentDidMount() {}

  render() {
    const { sessions } = this.state;

    return (
      <SessionList>
        {sessions.map(session => {
          return <SessionCard key={session._id} data={session} />;
        })}
      </SessionList>
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

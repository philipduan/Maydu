import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessions } from '../../../api/Sessions';

class SessionExpand extends Component {
  constructor() {
    super();
    this.state = {
      session: []
    };
  }
  componentDidMount() {
    console.log('egg');
  }

  componentWillReceiveProps(nextProps) {
    console.log('chicken');

    console.log(nextProps);
    const session = nextProps.sessions.filter(
      sesh => (sesh._id === nextProps.match.params.id ? sesh : null)
    );
    // console.log('dsadad', session);
    this.setState({ session });
  }
  render() {
    const session = this.state.session;
    console.log('dsadasds', session);
    return (
      <div className="session-brief-wrap">
        <header className="session-brief-header">
          {` ${session.courseCode}:  ${session.title}`}
        </header>
        <div className="session-brief-contain">
          <h2 className="session-brief-date">Date:&#160; {session.date}</h2>
          <h2 className="session-brief-time">Time: {session.time}</h2>
          <h2
            className={`${session._id}session-location`}
            style={{ display: 'none' }}
          >
            Location: {session.location}
          </h2>
          <div
            className={`${session._id}info`}
            style={{
              maxHeight: '3.5rem',
              overflow: 'hidden'
            }}
          >
            <p className="session-brief-bio">
              I'm going to lap some water out of my master's cup meow lick human
              with sandpaper tongue. Throwup on your pillow climb a tree, wait
              for a fireman jump to
              {session.description}
            </p>
            <hr />
            <h2
              onClick={() =>
                this.props.history.push(`/user/${session.sessionCreator._id}`)
              }
              style={{ cursor: 'pointer' }}
              className="session-creator"
            >
              {/* Creator: {session.sessionCreator.profile.fullName} */}
            </h2>
            <hr />
          </div>
          <div className="btn-contain">
            <button className="rsvp-confirm">Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('sessions');
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    sessions: Sessions.find({}).fetch() //Try to filter the find here by the url params and see if that works
  };
}, SessionExpand);

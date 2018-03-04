import React, { Component } from 'react';
import SessionCard from './SessionCard';
import './style.css';

export default class SessionList extends Component {
  constructor() {
    super();
  }

  render() {
    const { sessions, currentUser } = this.props;
    const search = this.props.search
      ? ` matching the code '${this.props.search}'`
      : ' created.';
    const list =
      sessions.length > 0 ? (
        sessions.map((session, index) => {
          return currentUser._id !== session.sessionCreator._id ? (
            <SessionCard
              key={index}
              data={session}
              pending={
                currentUser.profile.pendingSessions.includes(session._id)
                  ? true
                  : false
              }
            />
          ) : null;
        })
      ) : (
        <div className="null-sessions">{`There are no sessions ${search}`}</div>
      );
    return <div className="session-list">{list}</div>;
  }
}
// sdfhdgjghksjvafshdjkfbvfdaruhsdxncvbrahiusfdknjvbhdarfskjdnkjsjdras

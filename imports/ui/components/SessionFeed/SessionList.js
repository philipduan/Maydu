import React, { Component } from 'react';
import SessionCard from './SessionCard';

export default class SessionList extends Component {
  constructor() {
    super();
  }
  render() {
    const { sessions } = this.props;

    return (
      <div className="session-list">
        {sessions.map((session, index) => {
          return <SessionCard key={index} data={session} />;
        })}
      </div>
    );
  }
}

import React, { Component } from 'react';
import SessionCard from './SessionCard';
import './style.css';

export default class SessionList extends Component {
  constructor() {
    super();
  }

  render() {
    const { sessions } = this.props;
    const search = this.props.search
      ? ` matching the code '${this.props.search}'`
      : ' created.';
    const list =
      sessions.length > 0 ? (
        sessions.map((session, index) => {
          return <SessionCard key={index} data={session} />;
        })
      ) : (
        <div className='null-sessions'>{`There are no sessions ${search}`}</div>
      );
    return <div className="session-list">{list}</div>;
  }
}
// sdfhdgjghksjvafshdjkfbvfdaruhsdxncvbrahiusfdknjvbhdarfskjdnkjsjdras

import React, { Component } from 'react';
import SessionCard from './SessionCard';
import './style.css';

export default class SessionList extends Component {
  constructor() {
    super();
  }
  render() {
    const { sessions } = this.props;
    const list =
      sessions.length > 0
        ? sessions.map((session, index) => {
          return <SessionCards key={index} data={session} />;
        })
        : 'There are no sessions matching your search :( ';
    return <div className="session-list">{list}</div>;
  }
}
// sdfhdgjghksjvafshdjkfbvfdaruhsdxncvbrahiusfdknjvbhdarfskjdnkjsjdras

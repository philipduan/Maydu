import React, { Component } from 'react';
import SessionCard from './SessionCard';
import SessionList from './SessionList';
import './styles.css';
import { withRouter } from 'react-router-dom';





class SessionContainer extends Component {
    constructor(){
        super()
        state= {
            sessions: []
        }
    }
  componentWillMount() {
      
  }
  componentDidMount() {
    
  }

  render() {
    const {sessions} = this.state 

    return (

      <SessionList>
        {sessions.map(session => {
          return <SessionCard key={session._id} data={session} />;
        })}
      </SessionList>
    );
  }
}
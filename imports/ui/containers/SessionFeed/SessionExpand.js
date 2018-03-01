import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessions } from '../../../api/Sessions';
import { Location } from './GoogleApiComponent';

class SessionExpand extends Component {
  constructor() {
    super();
    this.state = {
      session: []
    };
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    let session = nextProps.sessions.filter(
      sesh => sesh._id === this.props.match.params.id
    );
    console.log(session);

    // console.log('dsadad', session);
    this.setState({ session });
    // fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCNzhBQy5iVhd3LAW-KgyXMVXCMLQptQdo&result_type=intersection`,
    //   {
    //     method: 'GET'
    //   }
    // ).then(data => {
    //   console.log('goggle map data', data);
    // });
  }
  render() {
    const session = this.state.session[0] ? (
      <div className="session-complete-wrap">
        {console.log(this.state.session[0])}
        <header className="session-complete-header">
          {` ${this.state.session[0].courseCode}:  ${
            this.state.session[0].title
          }`}
        </header>

        <div className="session-complete-contain">
          <h2 className="session-complete-date">
            Date:&#160; {this.state.session[0].date}
          </h2>
          <h2 className="session-complete-time">
            Time: {this.state.session[0].time}
          </h2>
          <h2 className={`session-complete-location`}>
            Location: {this.state.session[0].location}
          </h2>
          <div className={`session-complete-info`}>
            <p className="session-complete-bio">
              I'm going to lap some water out of my master's cup meow lick human
              with sandpaper tongue. Throwup on your pillow climb a tree, wait
              for a fireman jump to
              {this.state.session[0].description}
            </p>
            <hr />
            <h2
              onClick={() =>
                this.props.history.push(
                  `/user/${this.state.session[0].sessionCreator._id}`
                )
              }
              style={{ cursor: 'pointer' }}
              className="session-complete-creator"
            >
              Creator: {this.state.session[0].sessionCreator.profile.fullName}
            </h2>
            <hr />
            <Location
              isMarkerShown={true}
              lat={Object.values(this.state.session[0].exactGeoCode)[0]}
              lng={Object.values(this.state.session[0].exactGeoCode)[1]}
              //googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <div className="btn-contain">
            <button className="rsvp-confirm">Confirm</button>
          </div>
        </div>
      </div>
    ) : null;

    return <div>{session}</div>;
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

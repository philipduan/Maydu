import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './style.css';
import { withRouter } from 'react-router-dom';
import { Location } from './GoogleApiComponent';

class SessionCard extends Component {
  constructor() {
    super();
    this.state = {
      showStatus: 'More Info',
      expanded: false
    };
  }
  showMore = event => {
    //identification query bug
    console.log('more', this.props.data._id);
    this.setState({ showStatus: 'Less' });
    this.setState({ expanded: true });
    document.getElementsByClassName(
      `${this.props.data._id}info`
    )[0].style.maxHeight = null;
    document.getElementsByClassName(
      `${this.props.data._id}session-location`
    )[0].style.display =
      'flex';
  };
  showLess = event => {
    console.log('less', this.props.data._id);

    this.setState({ showStatus: 'More Info' });
    this.setState({ expanded: false });
    document.getElementsByClassName(
      `${this.props.data._id}info`
    )[0].style.maxHeight =
      '3.5rem';
    document.getElementsByClassName(
      `${this.props.data._id}session-location`
    )[0].style.display =
      'none';
  };
  render() {
    console.log(this.props);
    return (
      <div className="session-brief-wrap">
        <header className="session-brief-header">
          {` ${this.props.data.courseCode}:  ${this.props.data.title}`}
        </header>
        <div className="session-brief-contain">
          <h2 className="session-brief-date">
            Date:&#160; {this.props.data.date}
          </h2>
          <h2 className="session-brief-time">Time: {this.props.data.time}</h2>
          <h2
            className={`${this.props.data._id}session-location`}
            style={{ display: 'none' }}
          >
            Location: {this.props.data.street}
          </h2>
          <div
            className={`${this.props.data._id}info session-transition`}
            style={{
              maxHeight: '3.5rem',
              overflow: 'hidden',
              transition: 'max-height 1s ease-in'
              // note that we're transitioning max-height, not height!
            }}
          >
            <p className="session-brief-bio">
              I'm going to lap some water out of my master's cup meow lick human
              with sandpaper tongue. Throwup on your pillow climb a tree, wait
              for a fireman jump to
              {this.props.data.description}
            </p>
            <hr />
            {/* test comment */}
            <h2
              onClick={() =>
                this.props.history.push(
                  `/user/${this.props.data.sessionCreator._id}`
                )
              }
              style={{ cursor: 'pointer' }}
              className="session-creator"
            >
              Creator: {this.props.data.sessionCreator.profile.fullName}
            </h2>
            <hr />
            <Location
              isMarkerShown={true}
              lat={Object.values(this.props.data.geoCode)[0]}
              lng={Object.values(this.props.data.geoCode)[1]}
              //googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `200px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <div className="btn-contain">
            <button
              onClick={
                this.state.expanded === true ? this.showLess : this.showMore
              }
              className="session-brief-moreInfo"
            >
              {this.state.showStatus}
            </button>
            <button
              onClick={() =>
                this.props.history.push(`/sessions/${this.props.data._id}`)
              }
              className="rsvp"
            >
              RSVP
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionCard);

// Old Card Components
//====================

//Delete
// <div className="sessionCard">
//     {/* {console.log('data', data)} */}
//     <Card>
//       {/* <img src={data.imageurl} alt={data.title} /> */}
//       <CardHeader
//         style={{ cursor: 'pointer' }}
//         onClick={() => history.push(`/user/${data.sessionCreator._id}`)}
//         title={`Creator: ${data.sessionCreator.profile.fullName}`}
//         subtitle={data.sessionCreator.profile.bio}
//         // avatar={
//         //   <Gravatar email={data.itemowner.email} className="GravatarImg" />
//         // }
//       />
//       <CardTitle title={data.title} subtitle={data.courseCode} />
//       <CardText>{data.intersection}</CardText>
//       <CardText>{data.institution}</CardText>
//       <CardActions>
//         {data ? <FlatButton className="join-btn" label="Join" /> : ''}
//       </CardActions>
//     </Card>
//   </div>

// <CardMedia
//         overlay={
//           data.available === false ? (
//             <CardTitle
//               className="available-status"
//               title="Unavailable"
//               subtitle=""
//             />
//           ) : (
//             ''
//           )
//         }
//       >  </CardMedia>

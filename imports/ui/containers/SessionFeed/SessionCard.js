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
import Profile from '../Profile/Profile';
import { connect } from 'react-redux';
import { getSessionInfo } from '../../redux/profile';

class SessionCard extends Component {
  constructor() {
    super();
    this.state = {
      showStatus: 'More Info',
      expanded: false
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   !nextProps ? console.log('no props') : console.log(nextProps)
  //   this.props.dispatch(getSessionInfo(nextProps.data))
  // }

  componentDidMount() {
    console.log('PROPS', this.props.data);
    this.props.dispatch(getSessionInfo(this.props.data));
  }

  showMore = event => {
    //identification query bug
    // console.log('more', this.props.data._id);
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
    // console.log('less', this.props.data._id);

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
  handleRsvp = () => {
    Meteor.call('users.pending', this.props.data._id);

    Meteor.call('sessions.RSVP', this.props.data._id);
  };

  handleCancel = () => {
    Meteor.call('users.cancel', this.props.data._id);

    Meteor.call('sessions.cancel', this.props.data._id);
  };

  render() {
    console.log('user', Meteor.user());
    console.log('props', this.props);
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
            Location: {this.props.data.address}
          </h2>
          <div
            className={`${this.props.data._id}info session-transition`}
            style={{
              maxHeight: '3.5rem',
              overflow: 'hidden',
              transition: 'height 1s ease-in'
              // note that we're transitioning max-height, not height!
            }}
          >
            <p className="session-brief-bio">
              {` ${this.props.data.description}`}
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
            {this.props.pending ? (
              <button onClick={this.handleCancel} className="rsvp">
                Cancel
              </button>
            ) : (
                <button onClick={this.handleRsvp} className="rsvp">
                  RSVP
              </button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profileData: state.profileData.profileData,
  isLoading: state.profileData.isLoading
});

const SessionCardRouter = withRouter(SessionCard);
export default connect(mapStateToProps)(SessionCardRouter);
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

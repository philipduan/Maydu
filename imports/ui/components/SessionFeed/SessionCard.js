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

const SessionCard = ({ data, history }) => (
  <div className="session-brief-wrap">
    <header className="session-brief-header">
      {data.courseCode}:{data.title}
    </header>
    <div className="session-brief-contain">
      <h2 className="session-brief-date">Date:&#160; {data.date}</h2>
      <h2 className="session-brief-time">Time: {data.time}</h2>
      <h2 className="session-location">Location: {data.location}</h2>
      <div className="session-expand">
        <p className="session-brief-bio">
          I'm going to lap some water out of my master's cup meow lick human
          with sandpaper tongue. Throwup on your pillow climb a tree, wait for a
          fireman jump to
          {data.description}
        </p>
      </div>
      <div className="btn-contain">
        <button className="session-brief-moreInfo">More Info</button>
        <button className="rsvp">RSVP</button>
      </div>
    </div>
  </div>
);

export default withRouter(SessionCard);

// Old Card Components
//====================

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

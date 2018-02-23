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
  <div className="sessionCard">
    {/* {console.log('data', data)} */}
    <Card>
      {/* <img src={data.imageurl} alt={data.title} /> */}
      <CardHeader
        style={{ cursor: 'pointer' }}
        onClick={() => history.push(`/user/${data.sessionCreator._id}`)}
        title={`Creator: ${data.sessionCreator.profile.fullName}`}
        subtitle={data.sessionCreator.profile.bio}
        // avatar={
        //   <Gravatar email={data.itemowner.email} className="GravatarImg" />
        // }
      />
      <CardTitle title={data.title} subtitle={data.courseCode} />
      <CardText>{data.intersection}</CardText>
      <CardText>{data.institution}</CardText>
      <CardActions>
        {data ? <FlatButton className="join-btn" label="Join" /> : ''}
      </CardActions>
    </Card>
  </div>
);

export default withRouter(SessionCard);

// Old Card Components
//====================

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

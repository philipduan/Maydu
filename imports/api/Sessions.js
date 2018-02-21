import { Mongo } from 'meteor/mongo';
export const Sessions = new Mongo.Collection('sessions');

Sessions.schema = new SimpleSchema({
  sessionCreator: { type: String, optional: false },
  title: { type: String, optional: false },
  institution: { type: String, optional: false },
  courseCode: { type: Number, defaultValue: null, optional: false },
  date: { type: String, optional: false },
  time: { type: String, optional: false },
  location: { type: String, optional: false },
  description: { type: String, optional: false },
  // rsvpAttending: { type: [UsersSchema] },
  // rsvpPending: { type: [UsersSchema] },
  maxCapacity: { type: Number, defaultValue: null, optional: false }
});

if (Meteor.isServer) {
  //Limiting and publishing/giving data to client
  Meteor.publish('sessions', function sessionsPublications() {
    const loggedInUser = Meteor.users.find(this.userId);
    return Sessions.find({ school: loggedInUser.school });
  });
}

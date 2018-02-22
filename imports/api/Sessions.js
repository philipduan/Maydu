import { Mongo } from 'meteor/mongo';
import _ from 'lodash';
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
    //Original
    //=========
    // const loggedInUser = Meteor.users.find(this.userId);
    //return Sessions.find({ institution: loggedInUser.institution });

    //Faker data purposes
    //===================
    const simpleInstitutionArray = ['University of Toronto', 'Ryerson', 'RED'];
    return Sessions.find({ institution: _.sample(simpleInstitutionArray) });
  });
}

Meteor.methods({
  //// Method that filters session based on user query
  'sessions.filterByCourseCode'(query) {
    try {
      if (!query) {
        console.log('null triggered in try');
        return null;
      }
      console.log('try method works', Sessions.find({ courseCode: query }));
      return Sessions.find({ courseCode: query });
    } catch (exception) {
      throw new Meteor.Error('500', exception.message);
    }
  }
});

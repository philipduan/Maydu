import { Mongo } from 'meteor/mongo';
import _ from 'lodash';
export const Sessions = new Mongo.Collection('sessions');

const simpleInstitutionArray = ['University of Toronto', 'Ryerson', 'RED'];
const sample = _.sample(simpleInstitutionArray);

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
    return Sessions.find({ institution: sample });
  });
}

Meteor.methods({
  //// Method that filters session based on user query
  'sessions.filterByCourseCode'(query) {
    try {
      if (!query) {
        console.log('query undef');
        return Sessions.find({ institution: sample }).fetch();
      }

      console.log('query is def');
      return Sessions.find({ courseCode: parseInt(query) }).fetch();
    } catch (exception) {
      throw new Meteor.Error('500', exception.message);
    }
  }
});

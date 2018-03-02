import { Mongo } from 'meteor/mongo';
import _ from 'lodash';
export const Sessions = new Mongo.Collection('sessions');

const simpleInstitutionArray = ['University of Toronto', 'Ryerson', 'RED'];
const sample = _.sample(simpleInstitutionArray);

Sessions.schema = new SimpleSchema({
  sessionCreator: { type: String, optional: false },
  title: { type: String, optional: false },
  institution: { type: String, optional: false },
  courseCode: { type: String, defaultValue: null, optional: false },
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

    return Sessions.find({ institution: Meteor.user().profile.institution });
  });
}

Meteor.methods({
  //// Method that filters session based on user query
  'sessions.filterByCourseCode'(query) {
    // console.log(query.toString(), 'query');
    try {
      if (!query) {
        return Sessions.find({
          institution: Meteor.user().profile.institution
        }).fetch();
      }
//nothing
      // console.log('query is def');
      // console.log('All Sessions ', Sessions.find({}).fetch());
      return Sessions.find({
        courseCode: query,
        institution: Meteor.user().profile.institution
      }).fetch();
    } catch (exception) {
      throw new Meteor.Error('500', exception.message);
    }
  },

  'sessions.saveNewSession'(session) {
    Sessions.insert(session);
  },
  'sessions.RSVP'(session) {
    Sessions.update(session, {
      $push: {
        pending: Meteor.userId()
      }
    });
    console.log('session update', session)
  }
 
});

import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Sessions } from '../../api/Sessions';
import { image, helpers } from 'faker';

const simpleInstitutionArray = ['University of Toronto', 'Ryerson', 'RED'];

Meteor.startup(() => {
  //Generate Data, but also check to see if data exists first
  //See if collection has any records
  const sessionRecords = Sessions.find({}).count();
  if (!sessionRecords) {
    _.times(100, () => {
      //Runs this code 100 times
      const { name, email, phone } = helpers.createCard(); //generates a full profile from faker library

      Sessions.insert({
        //Saves data to mongodb using Meteor
        sessionCreator: {
          _id:
            Math.floor(
              Math.random() * (Math.floor(9999) - Math.ceil(1000) + 1)
            ) + 1,
          profile: {
            fullName: name,
            photo: email,
            major: name,
            year: name,
            bio: name
          }
        },
        title: name,
        institution: _.sample(simpleInstitutionArray),
        courseCode:
          Math.floor(Math.random() * (Math.floor(9999) - Math.ceil(1000) + 1)) +
          1,
        date: name,
        time: name,
        location: name,
        description: name,
        maxCapacity:
          Math.floor(Math.random() * (Math.floor(9999) - Math.ceil(1000) + 1)) +
          1
      });
    });
  }
});

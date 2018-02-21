import Meteor from 'meteor/meteor';
import _ from 'lodash';
import Sessions from '../../api/Sessions';
import { name, email, phone } from 'faker';

Meteor.startup(() => {
  //Generate Data, but also check to see if data exists first
  //See if collection has any records
  const sessionRecords = Sessions.find({}).count();
  if (!numberRecords) {
    _.times(100, () => {
      //Runs this code 100 times
      const { name, email, phone } = helpers.createCard(); //generates a full profile from faker library

      Sessions.insert({
        //Saves data to mongodb using Meteor
        sessionCreator: email,
        title: name,
        institution: name,
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

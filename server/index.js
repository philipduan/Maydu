import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index.js';
import { Sessions } from '../imports/api/Sessions';

Meteor.startup(() => {
  // User
  // Return all the data about currently logged in user
  Meteor.publish('users', function() {
    return Meteor.users.find();
  });

  // =====================
});

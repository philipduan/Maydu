import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index.js';

Meteor.startup(() => {
  // User
  // Return all the data about currently logged in user
  Meteor.publish('user', function() {
    return Meteor.users.find({ _id: this.userId });
  });

  // =====================
});

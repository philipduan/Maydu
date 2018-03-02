import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index.js';
import { Sessions } from '../imports/api/Sessions';

Meteor.startup(() => {
  console.log(Meteor.settings);
});

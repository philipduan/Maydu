import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'users.pending'(sessionId) {
    Meteor.users.update(Meteor.userId(), {
      $push: {
        profile: {
          pendingSessions: sessionId
        }
      }
    });
    console.log('userr', Meteor.user());
  },
  // Update Users Basic Information
  'profiles.updateUserInformation'(updatedData) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: {
          fullName: updatedData.fullName,
          major: updatedData.major,
          currentYear: updatedData.currentYear,
          bio: updatedData.bio
        }
      }
    });
  }
});

export const Profiles = Meteor.users;

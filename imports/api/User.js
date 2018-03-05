import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'users.pending'(sessionId) {
    let pendingSessionsArray = Meteor.user().profile.pendingSessions;
    pendingSessionsArray.push(sessionId);
    Meteor.users.update(
      { _id: Meteor.userId() },
      {
        $addToSet: {
          'profile.pendingSessions': sessionId
        }
      }
    );
    console.log('userr', Meteor.user());
  },
  'users.cancel'(sessionId) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      {
        $pull: {
          'profile.pendingSessions': sessionId
        }
      }
    );
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

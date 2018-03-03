import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'users.pending'(sessionId) {
    console.log('i am here');
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

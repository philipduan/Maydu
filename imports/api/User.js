import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'users.pending'(sessionId) {
    console.log('i am here');
    let pendingSessionsArray = Meteor.user().profile.pendingSessions;
    pendingSessionsArray.push(sessionId);
    console.log(pendingSessions1);
    Meteor.users.update(
      { _id: Meteor.userId() },
      {
        $set: {
          profile: {
            pendingSessions: pendingSessionsArray
          }
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

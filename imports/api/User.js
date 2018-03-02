import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
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
  },
  // 'profiles.pushCreatedSessions'(sessionId) {
  //   Meteor.users.update(Meteor.userId(), {
  //     $push: {
  //       profile: {
  //         createdSessions: sessionId
  //       }
  //     }
  //   });
  // }   Started created push session logic
});

export const Profiles = Meteor.users;

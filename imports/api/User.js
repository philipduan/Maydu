import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// UserSchema = new SimpleSchema({
//   // _id: ObjectId,
//   Profile: {
//     fullName: String,
//     photo: String(url),
//     major: String,
//     year: Number,
//     bio: String

//     // SocialMedia: [ String (url) ],
//     // Postedsession: [ Session id ],
//     // Attendingsession: [ Session id ],
//     // Pendingsession: [ Session.id ]
//   }
// });

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
  }

  // Update Posted Sessions: Add ID of created session to postedSession

  // Update Attending Sessions: Add ID of session user is attending to attendingSession
  // Update Pending Sessions: Add ID of session user is waiting to get accepted at into pendingSession
});

// Meteor.users.attachSchema(UserSchema);

export const Profiles = Meteor.users;

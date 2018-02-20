import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

UserSchema = new SimpleSchema({
  _id: ObjectId,
  Fullname: String,
  Email: String,
  // School: University ObjectId,
  Photo: String(url),
  Major: String,
  Year: Number,
  Bio: String
  // SocialMedia: [ String (url) ],
  // Postedsession: [ Session id ],
  // Attendingsession: [ Session id ],
  // Pendingsession: [ Session.id ]
});

Meteor.methods({
  'profiles.update'(profile) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        name: profile.name,
        course: profile.course,
        bio: profile.bio,
        picture: profile.picture
      }
    });
  }
});
Meteor.users.attachSchema(UserSchema);
export const Profiles = Meteor.users;

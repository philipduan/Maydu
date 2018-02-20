import { Mongo } from 'meteor/mongo';

//Create a collection by using MongoCollection
export const Sessions = new Mongo.Collection('sessions', { idGeneration: 'MONGO' });

//Limiting and publishing/giving data to client
if (Meteor.isServer) {
  Meteor.publish('sessions', sessionsPublication = () => {

  })
}
import { Mongo } from 'meteor/mongo';
export const Sessions = new Mongo.Collection('sessions');

Sessions.schema = new SimpleSchema({
    sessionCreator: { type: String, optional: false, },
    title: { type: String, optional: false },
    courseCode: { type: Number, defaultValue: null, optional: false },
    date: { type: String, optional: false },
    time: { type: String, optional: false },
    location: { type: String, optional: false },
    description: { type: String, optional: false },
    maxCapacity: { type: Number, defaultValue: null, optional: false }
});


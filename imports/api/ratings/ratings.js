import { Mongo } from 'meteor/mongo';

const ratings = new Mongo.Collection('ratings');

export default ratings;

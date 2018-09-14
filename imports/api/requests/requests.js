import { Mongo } from 'meteor/mongo';

const requests = new Mongo.Collection('requests');

export default requests;

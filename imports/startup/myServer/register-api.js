import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';

import merge from 'lodash/merge';

import UserSchema from '../../api/loggedUser/User.graphql';
import UserResolvers from '../../api/loggedUser/resolvers';

import carSchema from '../../api/cars/cars.graphql';
import carResolvers from '../../api/cars/resolvers';

import ratingSchema from '../../api/ratings/ratings.graphql';
import ratingResolvers from '../../api/ratings/resolvers';

import requestSchema from '../../api/requests/requests.graphql';
import requestResolvers from '../../api/requests/resolvers';

import allUsersSchema from '../../api/users/users.graphql';


// sssxssssssssssssssssssssssssssssssssssgssss

const typeDefs = [UserSchema, carSchema, ratingSchema, requestSchema, allUsersSchema];
const resolvers = merge(UserResolvers, carResolvers, ratingResolvers,
  requestResolvers);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization),
  }),
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end();
  }
});

ServiceConfiguration.configurations.remove({
  service: 'facebook',
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: '1945971858758391',
  secret: 'c5ca569e5fb95426ac9a850a16a9791e',
});

ServiceConfiguration.configurations.remove({
  service: 'google',
});

ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: '863046083031-5g09mv2c8fv01f346kbplk8n2slvhjvl.apps.googleusercontent.com',
  secret: 'wfvnTJYX4uf9g1Rkc7jNg2OS',
});

const app = require('express')();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
app.use(require('body-parser').text());


app.post('/charge', async (req, res) => {
  try {
    const { status } = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.headers.token,
    });
    res.status(200).send(JSON.stringify({ a: 1 }));
  } catch (err) {
    res.status(500).end();
  }
});


WebApp.connectHandlers.use(app);

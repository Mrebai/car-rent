
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloProvider } from 'react-apollo';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { Accounts } from 'meteor/accounts-base';
import AdminIndex from '../../ui/admin';
import App from '../../ui/App';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Accounts._storedLoginToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <div>

        <App />
      </div>

    </ApolloProvider>,
    document.getElementById('app'),
  );
});

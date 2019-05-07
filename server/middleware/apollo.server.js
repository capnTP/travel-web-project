import 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import locale from '../../src/helpers/locale';
import userHelper from '../../src/helpers/user';
import currency from '../../src/helpers/currency';
import constants from '../../src/constants';

// let savedForward = '';
const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = req =>
  new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    // TODO make url config
    link: ApolloLink.from([
      errorLink,
      createHttpLink({
        // eslint-disable-next-line no-undef
        uri: constants.GRAPHQL_URL,
        credentials: 'same-origin',
        headers: {
          cookie: req.header('Cookie'),
          locale: locale.get(req),
          currency: JSON.stringify(currency.get(req.header('Cookie'))),
          authorization: JSON.stringify(userHelper.get(req.header('Cookie'))),
        },
      }),
    ]),
    cache: new InMemoryCache(),
    queryDeduplication: true,
  });

export default client;

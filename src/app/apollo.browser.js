import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import userHelper from '../helpers/user';
import locale from '../helpers/locale';
import currency from '../helpers/currency';
import constants from '../constants';

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__); // eslint-disable-line no-underscore-dangle
export default new ApolloClient({
  ssrMode: true,
  link: ApolloLink.from([
    onError(error => {
      const { networkError, graphQLErrors } = error;

      if (networkError) {
        if (networkError.statusCode === 401) {
          window.location.search = '?popup=signing';
        }
      }

      if (graphQLErrors) {
        graphQLErrors.forEach(graphQlError => {
          const { message, locations, path } = graphQlError;

          // NOTE:
          // workaround for catching 401 error
          // because this error link does not return networkError object at all
          if (message === 'Request failed with status code 401') {
            window.location.search = '?popup=signing';
            return;
          }

          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          );
        });
      }
    }),
    new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: JSON.stringify(userHelper.get()),
          locale: locale.get(),
          currency: JSON.stringify(currency.get()),
        },
      }));
      return forward(operation);
    }),
    new HttpLink({ uri: constants.GRAPHQL_URL }),
  ]),
  cache,
  queryDeduplication: true,
  connectToDevTools: true,
});

/* eslint-disable react/prop-types */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';

import localeHelper from '../helpers/locale';
import cookiesHelper from '../helpers/cookiesHelper';

import App from './App';

// request.path before now its url
const Server = ({ request, context, client, i18n }) => {
  const userLocale = localeHelper.get(request);
  const routeBasename = userLocale === 'en' ? '' : `/${userLocale}`;
  cookiesHelper.initOnServer(request);

  return (
    <ApolloProvider client={client} store={{}}>
      <I18nextProvider i18n={i18n}>
        <StaticRouter basename={routeBasename} context={context} location={request.url}>
          <App context={context} i18n={i18n} request={request} />
        </StaticRouter>
      </I18nextProvider>
    </ApolloProvider>
  );
};
export default Server;

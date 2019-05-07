import React from 'react';
import { Capture } from 'react-loadable';

import App from '../../src/app/server';

export default (request, context, client, i18nServer, addModules) => (
  <Capture report={addModules}>
    <App client={client} context={context} i18n={i18nServer} request={request} />
  </Capture>
);

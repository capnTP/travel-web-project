// @flow
/* eslint-disable no-undef, no-console */

const constants: {
  API_URL: string,
  APP_URL: string,
  GRAPHQL_URL: string,
  IMIGIX_URL: string,
  LOGGING_LEVEL: string,
  SANDBOX: boolean,
  SERVER_TYPE: string,
  SERVER_URL: string,
} = {
  /** Global variables from webpack config */
  // $FlowFixMe
  API_URL: API_SERVER,
  // $FlowFixMe
  APP_URL,
  // $FlowFixMe
  IMIGIX_URL,
  // $FlowFixMe
  SERVER_URL: APP_URL,
  // $FlowFixMe
  LOGGING_LEVEL,
  // $FlowFixMe
  GRAPHQL_URL,
  // $FlowFixMe
  SANDBOX,
  SERVER_TYPE: process.env.SERVER_TYPE || 'development',
};

export default constants;

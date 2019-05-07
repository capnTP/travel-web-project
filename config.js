/* eslint-disable no-process-env */

function getLoggingLevel({ env, loggingLevel }) {
  // See list of logging levels here
  // https://github.com/winstonjs/winston/tree/2.4.0#logging-levels

  if (!loggingLevel) {
    if (env === 'production') {
      return 'error';
    }
    return 'debug';
  }

  return loggingLevel;
}

const env = process.env.NODE_ENV || 'development';

const config = {
  host: process.env.HOST || 'localhost',
  loggingLevel: getLoggingLevel({
    env,
    loggingLevel: process.env.LOGGING_LEVEL,
  }),
  port: process.env.PORT || 3000,
};

if (typeof window !== 'undefined') {
  config.host = window.location.hostname;
  config.port = window.location.port || 80;
}

module.exports = config;

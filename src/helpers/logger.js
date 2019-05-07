// @flow
/* eslint-disable no-console, sort-keys */
import constants from '../constants';

// Ref: https://github.com/winstonjs/winston#logging-levels
const level: { [string]: number } = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

const loggingLevel: number = level[constants.LOGGING_LEVEL] || 3;

if (loggingLevel === 7) {
  console.group('client side constants (this log should not display on production)');
  Object.keys(constants).forEach(key => {
    console.log(`${key}=${String(constants[key])}`);
  });
  console.groupEnd();
}

export default {
  clearConsole() {
    console.clear();
  },
  debug(...args: any[]): void {
    if (loggingLevel >= level.debug) {
      console.log('Debug  |', ...args);
    }
  },
  error(...args: any[]): void {
    if (loggingLevel >= level.error) {
      console.error('Error  |', ...args);
    }
  },
  info(...args: any[]): void {
    if (loggingLevel >= level.info) {
      console.info('Info  |', ...args);
    }
  },
};

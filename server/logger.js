/* eslint-disable no-console */
const winston = require('winston');
const moment = require('moment');
const chalk = require('chalk');

const env = require('./environmentVariables');
const axios = require('./helpers/axios');

class ServerLogger extends winston.Transport {
  constructor(options) {
    super(options);
    this.name = 'serverLogger';
    this.level = options.level || 'error';
  }

  log(level, msg, meta, callback) {
    axios
      .post('/logs', {
        type: level,
        source: env.APPLICATION_NAME,
        severity: 0,
        message: JSON.stringify(meta, Object.getOwnPropertyNames(meta)),
        response: '',
        model_name: '',
        status_code: '',
      })
      .then(response => {
        console.log('log-id=', response.data.id);
      })
      .catch(error => {
        console.error(`error::${this.name}::axios::post`, error);
      })
      .then(() => {
        callback(null, true);
      });
  }
}
winston.transports.ServerLogger = ServerLogger;

class SlackHook extends winston.Transport {
  constructor(options) {
    super(options);
    this.internalLogTitle = 'logger.transport.SlackHook';
    this.name = 'slackHook';
    this.level = options.level || 'error';
    this.hookUrl = options.hookUrl || '';
    if (!this.hookUrl) {
      this.warn('options.hookUrl was not provided');
    }
    this.debug(`\n${JSON.stringify({ options }, null, 4)}`);
  }

  baseLog(key, mainColor, ...args) {
    console.log(
      chalk.hex(mainColor)(`[${key}] ${this.internalLogTitle}`),
      '::',
      chalk.hex(mainColor)(...args),
    );
  }

  debug(...args) {
    this.baseLog('debug', '#42A5F5', ...args);
  }

  warn(...args) {
    this.baseLog('warn', '#FF9800', ...args);
  }

  log(level, msg, meta, callback) {
    if (!this.hookUrl) {
      this.warn('options.hookUrl was not provided');
      return;
    }
    axios
      .post(this.hookUrl, {
        text: `*${moment().format()}*\n${msg}\n\`\`\`${JSON.stringify(
          meta,
          Object.getOwnPropertyNames(meta),
          4,
        )}\`\`\``,
        username: 'Website error',
        icon_emoji: ':exclamation:',
      })
      .catch(error => {
        console.error(`logger::SlackHook`, `error::${this.name}::axios::post`, error);
      })
      .then(() => {
        callback(null, true);
      });
  }
}
winston.transports.SlackHook = SlackHook;

const logger = new winston.Logger({
  level: env.LOGGING_LEVEL,
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
    }),
    new winston.transports.ServerLogger({}),
    new winston.transports.SlackHook({ level: 'error', hookUrl: env.SLACK_HOOK_URL }),
  ],
});

module.exports = logger;

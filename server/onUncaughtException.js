const logger = require('./logger');

process.on('uncaughtException', error => {
  logger.error('uncaughtException', error);
});

/* eslint-disable no-console */
const chalk = require('chalk');

const environmentVariables = {
  APP_URL: process.env.APP_URL,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  BASE_API_URL: process.env.BASE_API_URL,
  BLOG_URL: process.env.BLOG_URL,
  IMGIX_URL: process.env.IMGIX_URL,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL,
  SLACK_HOOK_URL: process.env.SLACK_HOOK_URL,
};

console.group(chalk.bold("\nServer's environment variables"));
Object.keys(environmentVariables).forEach(key => {
  console.log(`${chalk.blue(key)}=${environmentVariables[key]}`);
});
console.groupEnd();

module.exports = environmentVariables;

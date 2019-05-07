/* eslint
'prettier/prettier': [ ERROR, { singleQuote: true, trailingComma: 'all', printWidth: 999, tabWidth: 2 } ]
'no-console': 0
*/
const webpack = require('webpack');
const chalk = require('chalk');

function throwErrorIfMissing(key, value) {
  if (!value) {
    throw new Error(`${key} is missing. To fix it, set value to process.env.${key} before webpack build`);
  }
}

const globalVars = {
  __DATE_FORMAT__: JSON.stringify('YYYY-MM-DDTHH:mm:ss.SSSS[Z]'),
  API_SERVER: JSON.stringify(process.env.API_SERVER),
  APP_URL: JSON.stringify(process.env.APP_URL),
  GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
  IMIGIX_URL: JSON.stringify(process.env.IMIGIX_URL),
  LOGGING_LEVEL: JSON.stringify(process.env.LOGGING_LEVEL || 'error'),
  PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL || '/'),
  SANDBOX: process.env.SANDBOX || true,
};

console.group(chalk.bold('\nInject environment variables at build time'));
Object.keys(globalVars).forEach(key => {
  throwErrorIfMissing(key, globalVars[key]);
  console.log(`  ${key}=${chalk.green(globalVars[key])}`);
});
console.groupEnd();

module.exports = new webpack.DefinePlugin(globalVars);

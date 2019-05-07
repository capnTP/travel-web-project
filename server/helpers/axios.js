const axios = require('axios');

const baseURL = process.env.BASE_API_URL;

if (!baseURL) {
  throw new Error(
    'axios baseURL is empty. To fix this error, set value to process.env.BASE_API_URL',
  );
}

module.exports = axios.create({ baseURL });

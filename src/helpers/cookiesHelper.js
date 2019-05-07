import Cookies from 'universal-cookie';

import logger from './logger';

let cookies = null;

export default {
  initOnServer(req) {
    logger.debug('[cookiesHelper] init cookies on server');
    cookies = new Cookies(req.headers.cookie);
  },
  get() {
    if (!cookies) {
      cookies = new Cookies();
    }
    return cookies;
  },
};

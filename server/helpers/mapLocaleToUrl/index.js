const logger = require('../../logger');

function debug(...args) {
  return logger.debug('[mapLocaleToUrl]', ...args);
}

module.exports = function mapLocaleToUrl(path, locale) {
  debug(`path=${path}`);
  debug(`locale=${locale}`);

  // NOTE: empty string means 'en', for example https://www.theasia.com/discover/
  const _locale = /^(ko|th|zh)$/.test(locale) ? locale : '';
  debug(`_locale=${_locale}`);

  if (!path) {
    return _locale ? `/${_locale}/` : '/';
  }

  let urlWithTrailingSlash = path;

  // NOTE: process query-string (?)
  const _path = path.split('?');
  debug(`_path=${_path}`);
  if (!_path[1]) {
    urlWithTrailingSlash = /\/$/.test(_path[0]) ? _path[0] : `${_path[0]}/`;
  }
  debug(`urlWithTrailingSlash=${urlWithTrailingSlash}`);

  const match = /^\/(ko|th|zh)\//.exec(urlWithTrailingSlash);
  debug('match=', match);

  if (!match) {
    return _locale ? `/${_locale}${urlWithTrailingSlash}` : urlWithTrailingSlash;
  }

  const currentLocale = match ? match[1] : 'en';
  debug(`currentLocale=${currentLocale}`);

  if (currentLocale === 'en') {
    return _locale ? `/${_locale}${urlWithTrailingSlash}` : urlWithTrailingSlash;
  }

  // NOTE: when no locale selected, use original path
  if (!locale) {
    return urlWithTrailingSlash;
  }

  if (!_locale) {
    return urlWithTrailingSlash.replace(/^\/(ko|th|zh)\//, '/');
  }

  return urlWithTrailingSlash.replace(/^\/(ko|th|zh)\//, `/${_locale}/`);
};

export default {
  getLanguageFromUrl(pathname, languages = [], savedLocale) {
    if (!languages || languages.length === 0) {
      return '';
    }
    if (savedLocale) {
      return languages.find(l => l.abbr.toLowerCase() === savedLocale);
    }
    const chunks = pathname.split('/');
    const languagesAbbrs = languages.map(l => l.abbr.toLowerCase());
    if (!chunks[1] || languagesAbbrs.indexOf(chunks[1]) === -1) {
      return languages.find(l => l.abbr.toLowerCase() === 'en');
    }

    return languages.find(l => l.abbr.toLowerCase() === chunks[1]);
  },
  getUrlWithLocale(pathname, country, languages = []) {
    if (!country || !languages || languages.length === 0) {
      return '';
    }

    // Because sometimes pathname's 1st character is not '/'
    if (/^\/.*/.test(pathname) === false) {
      pathname = `/${pathname}`; // eslint-disable-line no-param-reassign
    }

    const chunks = pathname.split('/');
    const languagesAbbrs = languages.map(l => l.abbr.toLowerCase());

    if (chunks[1] && languagesAbbrs.indexOf(chunks[1]) === -1) {
      chunks.unshift('');
    }

    chunks[1] = country.abbr.toLowerCase();

    if (country.abbr.toLowerCase() === 'en') {
      chunks.splice(1, 1);
    }

    let urlWithLocale = chunks.join('/');

    /** Adding trailing slash */
    if (
      !urlWithLocale || // If href="", it will be redirect to current path
      (urlWithLocale && // Check if not lang to en in home
      /.*\/$/.test(urlWithLocale) === false && // Check if / at the end
        urlWithLocale.indexOf('?') === -1) // Check if no query string
    ) {
      urlWithLocale += '/';
    }

    return urlWithLocale;
  },
};

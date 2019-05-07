import Cookies from 'universal-cookie';

const USER_LOCALE = '__#userLocaleNew__';

const localeRegex = new RegExp(/^(\/en|\/ko|\/th|\/zh)\b/);

const locale = {
  get(request) {
    let urlLocale = '';
    if (request) {
      try {
        urlLocale = request.params[0].match(localeRegex);
      } catch (e) {
        console.error('Failed to get locale form url.');
      }

      if (urlLocale && urlLocale.length) {
        urlLocale = urlLocale[0];
        urlLocale = urlLocale.split('/')[1];
      }
    }

    if (typeof window !== 'undefined' && window.location.pathname) {
      urlLocale = window.location.pathname.match(localeRegex);

      if (urlLocale && urlLocale.length) {
        urlLocale = urlLocale[0];
        urlLocale = urlLocale.split('/')[1];
      }
    }

    if (urlLocale) {
      return urlLocale;
    }

    return 'en';
  },
  set(localeData) {
    const cookies = new Cookies();
    cookies.set(USER_LOCALE, localeData, { path: '/' });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_LOCALE, JSON.stringify(localeData));
    }
    return localeData;
  },
  clear(reqCookie) {
    const cookies = new Cookies(reqCookie);
    cookies.remove(USER_LOCALE);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_LOCALE, 'null');
    }
  },
  Event(callback) {
    this.callback = callback;
    this.run = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', event => {
          if (event.key === USER_LOCALE) {
            this.callback(event.newValue);
          }
        });
      }
    };
    return this.run;
  },
};

export default locale;

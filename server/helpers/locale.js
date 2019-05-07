import Cookies from 'universal-cookie';

const USER_LOCALE = '__#userLocaleNew__';

const locale = {
  get(request) {
    const cookies = new Cookies(request);
    return cookies.get(USER_LOCALE) || '';
  },
  set(localeData) {
    const cookies = new Cookies();
    cookies.set(USER_LOCALE, localeData, { path: '/' });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_LOCALE, JSON.stringify(localeData));
    }
    return localeData;
  },
  clear(request) {
    const cookies = new Cookies(request);
    cookies.remove(USER_LOCALE);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_LOCALE, 'null');
    }
  },
  Event(callback) {
    this.callback = callback;
    this.run = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (event) => {
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

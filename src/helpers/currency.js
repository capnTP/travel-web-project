import Cookies from 'universal-cookie';

const USER_CURRENCY = '__#userCurrencyVA__';

const defaultCurrency = {
  id: '2',
  symbol: 'USD',
  code: 'USD',
};

const currency = {
  get(requestCookie) {
    const cookies = new Cookies(requestCookie);
    // lastRequest = request;
    let currencyData = cookies.get(USER_CURRENCY);
    // console.log('currencyData : ', currencyData, defaultCurrency);
    currencyData = currencyData || defaultCurrency;
    return currencyData;
  },
  set(currencyData) {
    let jsonCurrencyData = currencyData;
    try {
      jsonCurrencyData = JSON.parse(jsonCurrencyData);
      jsonCurrencyData = {
        id: jsonCurrencyData.id,
        code: jsonCurrencyData.code,
      };
      // eslint-disable-next-line no-empty
    } catch (e) {}

    const cookies = new Cookies();
    console.log('jsonCurrencyData : ', jsonCurrencyData);
    delete jsonCurrencyData.displayName;
    cookies.set(USER_CURRENCY, jsonCurrencyData, { path: '/' });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_CURRENCY, JSON.stringify(jsonCurrencyData));
    }
    return currencyData;
  },
  clear(request) {
    const cookies = new Cookies(request);
    // lastRequest = '';
    cookies.remove(USER_CURRENCY);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_CURRENCY, 'null');
    }
  },
  Event(callback) {
    this.callback = callback;
    this.run = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', event => {
          if (event.key === USER_CURRENCY) {
            this.callback(event.newValue);
          }
        });
      }
    };
    return this.run;
  },
};

export default currency;

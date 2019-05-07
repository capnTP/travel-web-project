import Cookies from 'universal-cookie';

const USER_CURRENCY = '__#userCurrencyVA__';

const defaultCurrency = {
  id: '2',
  symbol: 'USD',
  code: 'USD',
  exchangeRate: '1',
};

const currency = {
  get(request) {
    const cookies = new Cookies(request);
    // lastRequest = request;
    let currencyData = cookies.get(USER_CURRENCY);
    currencyData = currencyData || defaultCurrency;
    return currencyData;
  },
  set(currencyData = {}) {
    const cookies = new Cookies();
    const copyCurrency = {
      id: currencyData.id,
      value: currencyData.id,
      symbol: currencyData.symbol,
      code: currencyData.code,
      exchangeRate: currencyData.exchangeRate,
    };
    cookies.set(USER_CURRENCY, copyCurrency, { path: '/' });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_CURRENCY, JSON.stringify(copyCurrency));
    }
    return copyCurrency;
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

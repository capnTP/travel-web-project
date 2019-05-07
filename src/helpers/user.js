import Cookies from 'universal-cookie';

const USER_ACCESS = '__#userInfo__';
const user = {
  get(reqCookie) {
    const cookies = new Cookies(reqCookie);
    let usrInfo = cookies.get(USER_ACCESS);
    // console.log('usrInfo : ', usrInfo);
    usrInfo = usrInfo || '';
    return usrInfo;
  },
  set(userData) {
    const cookies = new Cookies();
    cookies.set(USER_ACCESS, userData, { path: '/', expires: new Date(Date.now() + userData.ttl) });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_ACCESS, 'login');
    }
    return userData;
  },
  clear(reqCookie) {
    const cookies = new Cookies(reqCookie);
    cookies.remove(USER_ACCESS, { path: '/' });

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_ACCESS, 'logout');
    }
  },
  Event(callback) {
    this.callback = callback;
    this.run = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', event => {
          if (event.key === USER_ACCESS) {
            this.callback(event.newValue);
          }
        });
      }
    };
    return this.run;
  },
};

export default user;

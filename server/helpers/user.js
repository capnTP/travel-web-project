import Cookies from 'universal-cookie';

const USER_ACCESS = '__#userInfo__';
const user = {
  get(request) {
    const cookies = new Cookies(request);
    let usrInfo = cookies.get(USER_ACCESS);
    usrInfo = usrInfo || '';
    return usrInfo;
  },
  set(userData) {
    const cookies = new Cookies();
    cookies.set(USER_ACCESS, userData, { path: '/' });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_ACCESS, 'login');
    }
    return userData;
  },
  clear(request) {
    const cookies = new Cookies(request);
    cookies.remove(USER_ACCESS);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_ACCESS, 'logout');
    }
  },
  Event(callback) {
    this.callback = callback;
    this.run = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (event) => {
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

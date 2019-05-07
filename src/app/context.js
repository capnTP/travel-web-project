import currency from '../helpers/currency';
import user from '../helpers/user';
import locale from '../helpers/locale';
import isMobile from '../helpers/detectDeviceType';

const context = (request = {}) => {
  if (Object.keys(request).length) {
    return {
      device: request.device.type === 'phone' ? 'mobile' : 'desktop',
      user: user.get(request.header('Cookie')),
      locale: locale.get(request),
      currency: currency.get(request.header('Cookie')),
    };
  }
  return {
    device: isMobile() ? 'mobile' : 'desktop',
    user: user.get(),
    locale: locale.get(),
    currency: currency.get(),
  };
};

export default context;

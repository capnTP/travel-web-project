import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(Backend)
  .use(reactI18nextModule)
  .init({
    wait: false,
    whitelist: ['en', 'ko', 'th', 'zh'],
    fallbackLng: 'en',
    preload: ['en'],
    returnObjects: true,
    // have a common namespace used around the full app
    ns: ['common', 'home'],
    defaultNS: ['common', 'home'],

    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true,
    },
  });

export default i18n;

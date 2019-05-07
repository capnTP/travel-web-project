import i18n from 'i18next';
import { LanguageDetector } from 'i18next-express-middleware';

let lastBackend = '';
const i18nInit = Backend => {
  if (Backend) lastBackend = Backend;
  return i18n
    .use(lastBackend)
    .use(LanguageDetector)
    .init({
      initImmediate: false,
      whitelist: ['en', 'ko', 'th', 'zh'],
      fallbackLng: 'en',
      // IMPORTANT, FOR LOAD ALL LOCALES IN SERVER ONLY
      preload: ['en', 'ko', 'th', 'zh'],
      returnObjects: true,
      // have a common namespace used around the full app
      ns: ['common', 'signing', 'home'],
      defaultNS: ['common', 'home'],

      debug: false,

      interpolation: {
        escapeValue: false, // not needed for react!!
      },

      backend: {
        loadPath: './build/locales/{{lng}}/{{ns}}.json',
        jsonIndent: 2,
      },
    });
};

export default i18nInit;

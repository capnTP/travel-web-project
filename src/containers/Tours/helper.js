// @flow
export default {
  isLocaleMatchAvailableLanguages(locale: string, availableLanguages: string[]): boolean {
    if (availableLanguages.length === 0) {
      return true;
    }

    return availableLanguages.indexOf(locale) > -1;
  },
};

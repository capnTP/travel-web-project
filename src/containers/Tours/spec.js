// @flow
import helper from './helper';

describe('helper', () => {
  describe('isLocaleMatchAvailableLanguages', () => {
    it('should return expected result', () => {
      expect(helper.isLocaleMatchAvailableLanguages('en', [])).toBe(true);
      expect(helper.isLocaleMatchAvailableLanguages('en', ['en'])).toBe(true);
      expect(helper.isLocaleMatchAvailableLanguages('en', ['ko'])).toBe(false);
      expect(helper.isLocaleMatchAvailableLanguages('ko', ['en', 'zh', 'th'])).toBe(false);
      expect(helper.isLocaleMatchAvailableLanguages('ko', ['en', 'zh', 'th', 'ko'])).toBe(true);
    });
  });
});

import helper from './helper';

describe('helper', () => {
  describe('getLanguageFromUrl', () => {
    describe('from index', () => {
      test('en', () => {
        const pathname = '/';
        const languages = [
          { abbr: 'th', name: 'Thai' },
          { abbr: 'en', name: 'English' },
          { abbr: 'ko', name: 'Korean' },
          { abbr: 'zh', name: 'Chinese' },
        ];
        const result = helper.getLanguageFromUrl(pathname, languages);
        expect(result.name).toBe('English');
      });

      test('other language', () => {
        const pathname = '/ko';
        const languages = [
          { abbr: 'th', name: 'Thai' },
          { abbr: 'en', name: 'English' },
          { abbr: 'ko', name: 'Korean' },
          { abbr: 'zh', name: 'Chinese' },
        ];
        const result = helper.getLanguageFromUrl(pathname, languages);
        expect(result.name).toBe('Korean');
      });
    });
  });

  describe('getUrlWithLocale', () => {
    describe('error handling', () => {
      it('should return index when input is invalid', () => {
        const result = helper.getUrlWithLocale();
        expect(result).toBe('');
      });
    });

    describe('from index', () => {
      test('en to other', () => {
        const pathname = '/';
        const country = { abbr: 'ko' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/ko/');
      });

      test('other to en', () => {
        const pathname = '/ko';
        const country = { abbr: 'en' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/');
      });

      test('other to other', () => {
        const pathname = '/ko';
        const country = { abbr: 'th' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/th/');
      });

      test('other to en with trailing slash', () => {
        const pathname = '/ko/';
        const country = { abbr: 'en' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/');
      });
    });

    describe('from other pages', () => {
      test('en to other language', () => {
        const pathname = '/discover/bonsai-cruise-skyline-dinner-cruise-saigon-river-194';
        const country = { abbr: 'ko' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/ko/discover/bonsai-cruise-skyline-dinner-cruise-saigon-river-194/');
      });

      test('other language to en', () => {
        const pathname = '/zh/discover/bonsai-cruise-skyline-dinner-cruise-saigon-river-194';
        const country = { abbr: 'en' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/discover/bonsai-cruise-skyline-dinner-cruise-saigon-river-194/');
      });

      test('other language to not en', () => {
        const pathname = '/ko/discover/bonsai-cruise-skyline-dinner-cruise-saigon-river-194';
        const country = { abbr: 'zh' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/zh/discover/bonsai-cruise-skyline-dinner-cruise-saigon-river-194/');
      });

      test('en to other language without / in the first character', () => {
        const pathname = 'discover/bonsai-cruise-skyline-dinner-cruise-saigon-river-194';
        const country = { abbr: 'ko' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/ko/discover/bonsai-cruise-skyline-dinner-cruise-saigon-river-194/');
      });
    });

    describe('trailing slash', () => {
      it('should add trailing slash', () => {
        const pathname = 'discover';
        const country = { abbr: 'ko' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/ko/discover/');
      });

      it('should not add trailing slash', () => {
        const pathname = 'discover/';
        const country = { abbr: 'ko' };
        const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

        const result = helper.getUrlWithLocale(pathname, country, languages);
        expect(result).toBe('/ko/discover/');
      });

      describe('with quety string', () => {
        test('from en', () => {
          const pathname = 'discover/?categoryIds=1&&categoryTypeIds=5';
          const country = { abbr: 'ko' };
          const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

          const result = helper.getUrlWithLocale(pathname, country, languages);
          expect(result).toBe('/ko/discover/?categoryIds=1&&categoryTypeIds=5');
        });

        test('to en', () => {
          const pathname = 'ko/discover/?categoryIds=1&&categoryTypeIds=5';
          const country = { abbr: 'en' };
          const languages = [{ abbr: 'th' }, { abbr: 'en' }, { abbr: 'ko' }, { abbr: 'zh' }];

          const result = helper.getUrlWithLocale(pathname, country, languages);
          expect(result).toBe('/discover/?categoryIds=1&&categoryTypeIds=5');
        });
      });
    });
  });
});

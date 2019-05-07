import helper from './helper';

describe('Validator', () => {
  const englishOnly = {
    test(value) {
      const valid = /^[A-Za-z0-9][A-Za-z0-9 ]*$/.test(value);

      if (!valid) {
        return 'Must be English only';
      }

      return '';
    },
  };

  const validPassportNumber = {
    test(value) {
      const valid = /^[A-Za-z0-9]*$/.test(value);

      if (!valid) {
        return 'Invalid passport number';
      }

      return '';
    },
  };

  describe('test', () => {
    it('must return expected result', () => {
      const validator = helper.getValidator();

      expect(
        validator.test({
          firstName: { value: 'กขคง', rules: [englishOnly] },
          lastName: { value: '한국어 키보드', rules: [englishOnly] },
          passport_number: { value: 'กขคง00000001', rules: [validPassportNumber] },
          other1: { value: 'ABCD', rules: [englishOnly] },
          other2: { value: 'WARIZZ', rules: [englishOnly] },
          other3: { value: 'AB0000001', rules: [validPassportNumber] },
          noRules1: { value: 'no-rule-1', rules: [] },
          noRules2: { value: '@#$%^&', rules: '' },
          noRules3: { value: '*&^%$%$' },
        }),
      ).toEqual([
        {
          key: 'firstName',
          errors: ['Must be English only'],
        },
        {
          key: 'lastName',
          errors: ['Must be English only'],
        },
        {
          key: 'passport_number',
          errors: ['Invalid passport number'],
        },
      ]);
    });
  });
});

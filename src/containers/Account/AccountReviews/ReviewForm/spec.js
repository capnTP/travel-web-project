import helper from './helper';

describe('helper', () => {
  describe('getGroupSize', () => {
    it('should return expected result', () => {
      expect(
        helper.getGroupSize({
          adult_pax: 1,
          child_pax: 0,
          infant_pax: 0,
        }),
      ).toBe(1);

      expect(
        helper.getGroupSize({
          adult_pax: 2,
          child_pax: 0,
          infant_pax: 0,
        }),
      ).toBe(2);

      expect(
        helper.getGroupSize({
          adult_pax: 2,
          child_pax: 1,
          infant_pax: 0,
        }),
      ).toBe(3);
      expect(
        helper.getGroupSize({
          adult_pax: 2,
          child_pax: 1,
          infant_pax: 1,
        }),
      ).toBe(3);
      expect(
        helper.getGroupSize({
          adult_pax: 2,
          child_pax: 2,
          infant_pax: 1,
        }),
      ).toBe(3);

      expect(
        helper.getGroupSize({
          adult_pax: 10,
          child_pax: 0,
          infant_pax: 0,
        }),
      ).toBe(4);

      expect(
        helper.getGroupSize({
          adult_pax: null,
          child_pax: undefined, // eslint-disable-line no-undefined
          infant_pax: '',
        }),
      ).toBe(1);

      expect(
        helper.getGroupSize({
          adult_pax: 2,
        }),
      ).toBe(2);
    });
  });
});

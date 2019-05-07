import unit from '.';

describe('string helper', () => {
  describe('padEnd', () => {
    it('should return expected result', () => {
      expect(unit.padEnd('123456789101112131415', 11, '...')).toBe('12345678910...');
    });
  });
});

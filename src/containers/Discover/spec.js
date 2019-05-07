import helper from './helper';

describe('isLastPage', () => {
  it('should return expected result', () => {
    expect(helper.isLastPage(256, 5, 16)).toBe(false);
    expect(helper.isLastPage(16, 1, 16)).toBe(true);
    expect(helper.isLastPage(32, 2, 16)).toBe(true);
    expect(helper.isLastPage(55, 5, 10)).toBe(false);
    expect(helper.isLastPage(2, 1, 1)).toBe(false);
    expect(helper.isLastPage(2, 1, 2)).toBe(true);
    expect(helper.isLastPage(2, 99, 2)).toBe(true);
  });
});

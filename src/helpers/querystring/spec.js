import querystring from 'query-string';

import uut from '.';

describe('querystring', () => {
  it('should have same functionality as query-string (backward compatible)', () => {
    expect(uut.parse).toBe(querystring.parse);
    expect(uut.stringify).toBe(querystring.stringify);
  });

  describe('parseWithArray', () => {
    it('should return expected result', () => {
      expect(uut.parseWithArray('keyA=1!2!3!4&keyB=1234', 'keyA')).toEqual({
        keyA: ['1', '2', '3', '4'],
        keyB: '1234',
      });

      expect(
        uut.parseWithArray('keyA=1!2!3!4&keyB=1234&keyC=Lorem!ipsum!dolor!sit!amet', [
          'keyA',
          'keyC',
        ]),
      ).toEqual({
        keyA: ['1', '2', '3', '4'],
        keyB: '1234',
        keyC: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
      });

      // Use other separator
      expect(
        uut.parseWithArray(
          'keyA=1,2,3,4&keyB=1234&keyC=Lorem,ipsum,dolor,sit,amet',
          ['keyA', 'keyC'],
          ',',
        ),
      ).toEqual({
        keyA: ['1', '2', '3', '4'],
        keyB: '1234',
        keyC: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
      });
    });
  });

  describe('stringifyWithArray', () => {
    it('should return expected result', () => {
      // When keys is a string
      expect(
        uut.stringifyWithArray(
          {
            keyA: [1, 2, 3, 4],
            keyB: '1234',
          },
          'keyA',
        ),
      ).toBe('keyA=1!2!3!4&keyB=1234');

      // When use other separator
      expect(
        uut.stringifyWithArray(
          {
            keyA: [1, 2, 3, 4],
            keyB: '1234',
          },
          'keyA',
          ',',
        ),
      ).toBe('keyA=1%2C2%2C3%2C4&keyB=1234');

      // When value is not array
      expect(
        uut.stringifyWithArray(
          {
            keyB: '1234',
          },
          'keyB',
        ),
      ).toBe('keyB=1234');

      // With multiple keys
      expect(
        uut.stringifyWithArray(
          {
            keyA: [1, 2, 3, 4],
            keyB: '1234',
            keyC: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
          },
          ['keyA', 'keyC'],
        ),
      ).toBe('keyA=1!2!3!4&keyB=1234&keyC=Lorem!ipsum!dolor!sit!amet');

      // When value is empty
      expect(
        uut.stringifyWithArray(
          {
            keyA: '',
            keyB: '',
          },
          'keyB',
        ),
      ).toBe('');
    });
  });
});

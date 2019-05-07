import helper from './helper';

describe('helper', () => {
  describe('getPendingBookings', () => {
    it('should return expected result', () => {
      expect(
        helper.getPendingBookings({
          bookings: [],
          reviews: [],
        }),
      ).toEqual([]);

      const result2 = helper.getPendingBookings({
        bookings: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }],
        reviews: [{ booking_id: 'a' }, { booking_id: 'b', status: 2 }],
      });
      expect(result2).toEqual(expect.arrayContaining([{ id: 'b' }, { id: 'c' }, { id: 'd' }]));
      expect(result2).toHaveLength(3);
    });
  });
});

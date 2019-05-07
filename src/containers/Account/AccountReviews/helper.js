module.exports = {
  getPendingBookings({ bookings, reviews }) {
    if (!bookings || bookings.length === 0) {
      return [];
    }

    // get non-review bookings
    const reviewedBookingIds = reviews.map(r => r.booking_id);
    const nonReviewBookings = bookings.filter(b => reviewedBookingIds.indexOf(b.id) === -1);

    // get rejected review bookings
    const rejectedReviewBookingIds = reviews.filter(r => r.status === 2).map(r => r.booking_id);
    const rejectedReviewsBookings = bookings.filter(
      b => rejectedReviewBookingIds.indexOf(b.id) > -1,
    );

    return [...nonReviewBookings, ...rejectedReviewsBookings];
  },
};

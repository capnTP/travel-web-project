/* eslint-disable max-len */
export default {
  booking: {
    id: '1642',
    created_at: '2018-06-15T13:33:14.532Z',
    updated_at: '2018-06-17T08:13:54.422Z',
    adult_pax: null,
    bookingCurrencyCode: 'EUR',
    booking_no: '18001642',
    booking_status_id: '1',
    child_pax: null,
    infant_pax: null,
    passportNumber: '2744727',
    pickupLocationTime: null,
    pickupPlace: '',
    pickupTime: '',
    specialRequest: 'We have a baby',
    subTour: {
      id: '95',
      cancellationPolicy: {
        id: '3',
        name: 'Strict',
        description:
          'Full refund 7 days prior to selected day, except fees & Non-refundable for 1-6 days prior to selected day',
        __typename: 'CancellationPolicy',
      },
      name: 'Bangkoik City Culture (Morning ride with no transfer)',
      __typename: 'SubTour',
    },
    sub_product_id: '95',
    total: 32.59,
    tour: {
      id: '15',
      name: 'Sightseeing Bangkok on Bike - Lumpini Park, Khlong Toei Market & more',
      tourMedias: [
        {
          id: '1021',
          detail: {
            id: '4640',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F15%2F0.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1022',
          detail: {
            id: '4641',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F15%2F1.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1024',
          detail: {
            id: '4643',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F15%2F3.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1023',
          detail: {
            id: '4642',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F15%2F4.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1025',
          detail: {
            id: '4644',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F15%2F6.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
      ],
      __typename: 'Tour',
    },
    tour_id: '15',
    trip_starts: '2018-06-29T05:00:00.000Z',
    user: {
      id: '567',
      countryId: '1',
      email: 'warizz.yutanan@theasia.com',
      language_id: '1',
      name: 'warizz12 yutanan',
      nationality: {
        id: '1',
        name: 'Thailand',
        __typename: 'Country',
      },
      phone: '0898164880',
      __typename: 'Profile',
    },
    user_id: '567',
    __typename: 'Booking',
  },
};

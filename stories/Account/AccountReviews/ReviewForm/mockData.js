export default {
  bookingWithoutReview: {
    id: '87',
    bookingCurrencyCode: 'EUR',
    booking_no: '1800087',
    booking_status_id: '5',
    passportNumber: '',
    pickupLocationTime: '',
    pickupPlace: '',
    pickupTime: '',
    review: null,
    specialRequest: '',
    subTour: {
      id: '100',
      cancellationPolicy: {
        id: '4',
        name: 'Non-refundable',
        description:
          'Once payment has been completed, customer can not amend or cancel the booking.',
        __typename: 'CancellationPolicy',
      },
      name: 'Flower Dome and Cloud Forest',
      __typename: 'SubTour',
    },
    sub_product_id: '100',
    total: 28.8,
    tour: {
      id: '121',
      name: 'Cloud Forest and Flower Dome Tour - Singapore Garden by the Bay',
      tourMedias: [
        {
          id: '1077',
          detail: {
            id: '4696',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F0.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1079',
          detail: {
            id: '4698',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F1.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1087',
          detail: {
            id: '4706',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F10.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1088',
          detail: {
            id: '4707',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F11.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1089',
          detail: {
            id: '4708',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F12.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1091',
          detail: {
            id: '4710',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F13.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1090',
          detail: {
            id: '4709',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F14.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1076',
          detail: {
            id: '4695',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F15.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1078',
          detail: {
            id: '4697',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F2.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1080',
          detail: {
            id: '4699',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F3.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1081',
          detail: {
            id: '4700',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F4.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1082',
          detail: {
            id: '4701',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F5.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1083',
          detail: {
            id: '4702',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F6.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1084',
          detail: {
            id: '4703',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F7.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1085',
          detail: {
            id: '4704',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F8.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
        {
          id: '1086',
          detail: {
            id: '4705',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F121%2F9.jpg',
            __typename: 'TourMediaDetail',
          },
          __typename: 'TourMedia',
        },
      ],
      __typename: 'Tour',
    },
    tour_id: '121',
    trip_starts: '2018-01-22T11:00:00.000Z',
    user: {
      id: '567',
      countryId: '38',
      email: 'warizz.yutanan@theasia.com',
      language_id: '2',
      name: 'warizz yutanan',
      nationality: {
        id: '38',
        name: 'Timor-Leste',
        __typename: 'Country',
      },
      phone: '0898164880',
      __typename: 'Profile',
    },
    __typename: 'Booking',
  },
  bookingWithReview: {
    id: '74',
    bookingCurrencyCode: 'USD',
    booking_no: '18000074',
    booking_status_id: '5',
    passportNumber: 'M27668773',
    pickupLocationTime: '',
    pickupPlace: 'Anantara',
    pickupTime: '',
    review: {
      id: '3',
      group_size: 2,
      rating: 3,
      recommend: true,
      review: 'uuu\nuu\nu\nuu\nuuu',
      review_title: 'uuu',
      status: 1,
    },
    specialRequest: 'We have a baby',
    subTour: {
      id: '67',
      cancellationPolicy: {
        id: '2',
        name: 'Moderate',
        description:
          'Full refund 3 days prior to selected day, except fees & Non-refundable for 1-2 days prior to selected day',
      },
      name: 'Amphawa Floating Market - Traditional Thai Food and Thai Souvenirs',
    },
    sub_product_id: '67',
    total: 84.6,
    tour: {
      id: '5',
      name: 'Amphawa Floating Market - Traditional Thai Food and Thai Souvenirs',
      tourMedias: [
        {
          id: '2907',
          detail: {
            id: '6526',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_0.jpg',
          },
        },
        {
          id: '2909',
          detail: {
            id: '6528',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_01.jpg',
          },
        },
        {
          id: '2908',
          detail: {
            id: '6527',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_02.jpg',
          },
        },
        {
          id: '2910',
          detail: {
            id: '6529',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_03.jpg',
          },
        },
        {
          id: '2911',
          detail: {
            id: '6530',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_04.jpg',
          },
        },
        {
          id: '2913',
          detail: {
            id: '6532',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_05.jpg',
          },
        },
        {
          id: '2912',
          detail: {
            id: '6531',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_06.jpg',
          },
        },
        {
          id: '2914',
          detail: {
            id: '6533',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_07.jpg',
          },
        },
        {
          id: '2916',
          detail: {
            id: '6535',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_08.jpg',
          },
        },
        {
          id: '2915',
          detail: {
            id: '6534',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_09.jpg',
          },
        },
        {
          id: '2917',
          detail: {
            id: '6536',
            absoluteUrl: 'https://theasia-cloud.s3.amazonaws.com/tours%2F5%2F5_10.jpg',
          },
        },
      ],
    },
    tour_id: '5',
    trip_starts: '2018-02-24T05:00:00.000Z',
    user: {
      id: '567',
      countryId: '38',
      email: 'warizz.yutanan@theasia.com',
      language_id: '2',
      name: 'warizz yutanan',
      nationality: {
        id: '38',
        name: 'Timor-Leste',
      },
      phone: '0898164880',
    },
  },
};

import React from 'react';
import { storiesOf } from '@storybook/react';

import ReviewCard from '../../../../src/containers/Account/AccountReviews/ReviewCard';

import mockData from './mockData';

storiesOf('Account/AccountReviews/BookingCard', module)
  .add('No review', () => <ReviewCard booking={mockData.bookingWithoutReview} />)
  .add('Has approved review', () => <ReviewCard booking={mockData.bookingWithApprovedReview} />)
  .add('Has rejected review', () => <ReviewCard booking={mockData.bookingWithRejectedReview} />);

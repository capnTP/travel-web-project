import React from 'react';
import { storiesOf } from '@storybook/react';

import ReviewForm from '../../../../src/containers/Account/AccountReviews/ReviewForm';

import mockData from './mockData';

storiesOf('Account/AccountReviews/ReviewForm', module)
  .add('Empty', () => <ReviewForm booking={mockData.bookingWithoutReview} />)
  .add('With review', () => <ReviewForm booking={mockData.bookingWithReview} />);

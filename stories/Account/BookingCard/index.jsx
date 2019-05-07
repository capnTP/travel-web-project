import React from 'react';
import { storiesOf } from '@storybook/react';

import BookingCard from '../../../src/containers/Account/AccountBookings/BookingCard';

import mockData from './mockData';

storiesOf('BookingCard', module)
  .add('normal', () => <BookingCard booking={mockData.booking} />)
  .add('with expansion', () => <BookingCard showFullDetail booking={mockData.booking} />);

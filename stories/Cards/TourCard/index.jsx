import React from 'react';
import { storiesOf } from '@storybook/react';

import TourCard from '../../../src/components/Cards/TourCard';

import mockData from './mockData';

storiesOf('Cards/TourCard', module)
  .add('normal state', () => <TourCard tour={mockData.tour} />)
  .add('active state', () => <TourCard isActive tour={mockData.tour} />);

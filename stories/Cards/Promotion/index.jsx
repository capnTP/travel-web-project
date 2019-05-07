import React from 'react';
import { storiesOf } from '@storybook/react';

import Promotion from '../../../src/components/Cards/Promotion';

import mockData from './mockData';

storiesOf('Cards/Promotion', module)
  .add('normal card', () => <Promotion tour={mockData.tour} />)
  .add('active card', () => <Promotion active tour={mockData.tour} />)
  .add('yellow gradient', () => <Promotion color="yellow" tour={mockData.tour} />)
  .add('blue gradient', () => <Promotion color="blue" tour={mockData.tour} />)
  .add('loading normal', () => <Promotion isLoading tour={mockData.tour} />)
  .add('loading active', () => <Promotion active isLoading tour={mockData.tour} />);

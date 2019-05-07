import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

import CityCard from '../../../src/components/Cards/City';

import mockData from './mockData';

storiesOf('Cards/City', module).add('Normal', () => (
  <BrowserRouter>
    <CityCard {...mockData.city} />
  </BrowserRouter>
));

storiesOf('Cards/City', module).add('With weather', () => (
  <BrowserRouter>
    <CityCard {...mockData.city} weather={mockData.weather} />
  </BrowserRouter>
));

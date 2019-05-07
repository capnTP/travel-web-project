import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import ReviewCard from '../../../src/components/Cards/Review';
import reviewData from './mockData';
import tourData from '../TourCard/mockData';

storiesOf('Cards/Review', module)
  .add('normal state', () => (
    <BrowserRouter>
      <ReviewCard
        productSlug={reviewData.productSlug}
        review={reviewData.review}
        tour={tourData.tour}
      />
    </BrowserRouter>
  ))
  .add('loading state', () => (
    <BrowserRouter>
      <ReviewCard
        isLoading
        productSlug={reviewData.productSlug}
        review={reviewData.review}
        tour={tourData.tour}
      />
    </BrowserRouter>
  ));

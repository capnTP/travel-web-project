// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Component from '.';

describe('Component', () => {
  it('should render without error', () => {
    shallow(
      <Component
        categories={[]}
        categoryIds={[]}
        cityIds={[]}
        countries={[]}
        countryId=""
        currencyCode=""
        featureIds={[]}
        features={[]}
        hideLocationTab={false}
        onApply={() => {}}
        onChange={() => {}}
        onClearFilters={() => {}}
        priceRange={[]}
        productPriceRange={{
          high: 0,
          low: 0,
        }}
        productsCount={0}
        query=""
        ratingRange={[]}
        t={key => key || ''}
      />,
    );
  });
});

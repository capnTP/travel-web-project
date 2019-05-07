// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Component from '.';

describe('Component', () => {
  it('should render without error', () => {
    shallow(
      <Component
        currency="USD"
        name="name"
        rating={5}
        slug="slug"
        startingPrice={1000}
        translate={(value?: ?string) => value || ''}
      />,
    );
  });
});

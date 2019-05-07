// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Component from '.';

describe('Component', () => {
  it('should render without error', () => {
    shallow(
      <Component
        activeCityIds={[]}
        activeCountryId=""
        countries={[]}
        onClear={() => {}}
        onSelectCity={() => {}}
        onSelectCountry={() => {}}
        t={() => ''}
      />,
    );
  });
});

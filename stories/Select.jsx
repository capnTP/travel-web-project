/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from '../src/components/Select';

const options = [
  { value: '1', text: 'Lorem ipsum dolor sit amet' },
  {
    value: '2',
    text: 'consectetur adipiscing elit, sed do eiusmod tempor',
  },
];

storiesOf('Select', module)
  .add('normal', () => (
    <Select>
      <option disabled hidden selected value="">
        Select
      </option>

      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      ))}
    </Select>
  ))
  .add('hover', () => (
    <Select hover>
      <option disabled hidden selected value="">
        Select
      </option>

      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      ))}
    </Select>
  ))
  .add('focus', () => (
    <Select focus>
      <option disabled hidden selected value="">
        Select
      </option>

      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      ))}
    </Select>
  ))
  .add('disabled', () => (
    <Select disabled>
      <option disabled hidden selected value="">
        Select
      </option>

      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      ))}
    </Select>
  ))
  .add('loading', () => (
    <Select loading>
      <option disabled hidden selected value="">
        Select
      </option>

      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      ))}
    </Select>
  ))
  .add('full width', () => (
    <Select fullWidth>
      <option disabled hidden selected value="">
        Select
      </option>

      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      ))}
    </Select>
  ));

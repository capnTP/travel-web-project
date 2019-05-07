import React from 'react';
import { storiesOf } from '@storybook/react';

import Star from '../../../src/components/Forms/Star';

import '../../../src/assets/icons/style.css';

storiesOf('Form/Star', module)
  .add('normal', () => (
    <div>
      <Star />

      <Star rating={1} />

      <Star rating={2} />

      <Star rating={3} />

      <Star rating={4} />

      <Star rating={5} />
    </div>
  ))
  .add('readOnly', () => (
    <div>
      <Star readOnly />

      <Star rating={1} readOnly />

      <Star rating={2} readOnly />

      <Star rating={3} readOnly />

      <Star rating={4} readOnly />

      <Star rating={5} readOnly />
    </div>
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from '../../src/components/Checkbox';

storiesOf('Checkbox', module)
  .add('normal', () => (
    <div>
      <Checkbox />

      <Checkbox checked />

      <Checkbox label="This is label" />

      <Checkbox hasError label="Has error!" />
    </div>
  ))
  .add('disabled', () => (
    <div>
      <Checkbox disabled />

      <Checkbox checked disabled />

      <Checkbox disabled label="This is label" />

      <Checkbox disabled hasError label="Has error!" />
    </div>
  ));

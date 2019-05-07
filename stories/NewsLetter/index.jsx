import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import NewsLetter from '../../src/components/NewsLetter/Input';

storiesOf('NewsLetter', module).add('normal', () => (
  <BrowserRouter>
    <NewsLetter />
  </BrowserRouter>
));

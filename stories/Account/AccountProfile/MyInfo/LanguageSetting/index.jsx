/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LanguageSetting from '../../../../../src/containers/Account/AccountProfile/MyInfo/LanguageSetting';

import mockData from './mockData';

storiesOf('Account/AccountProfile/MyInfo/LanguageSetting', module)
  .add('no default data', () => (
    <LanguageSetting languages={mockData.languages} onSave={action('saved')} />
  ))
  .add('with default data', () => (
    <LanguageSetting languageId="2" languages={mockData.languages} onSave={action('saved')} />
  ))
  .add('loading', () => <LanguageSetting loading />);

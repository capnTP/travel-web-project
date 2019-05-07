import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import SocialButtons from '../../src/components/SocialButtons';
import style from './style.less';

import mockData from './mockData';

storiesOf('SocialButtons', module)
  .add('default', () => (
    <BrowserRouter>
      <div className={style.social_button_container}>
        <SocialButtons icons={mockData.socialData} />
      </div>
    </BrowserRouter>
  ))
  .add('backColor=white, color=primary', () => (
    <BrowserRouter>
      <div className={style.social_button_container}>
        <SocialButtons backColor="white" color="primary" icons={mockData.socialData} />
      </div>
    </BrowserRouter>
  ))
  .add('backColor=black', () => (
    <BrowserRouter>
      <div className={style.social_button_container}>
        <SocialButtons backColor="black" icons={mockData.socialData} />
      </div>
    </BrowserRouter>
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';
import classnames from 'classnames';

import style from './style.less';

storiesOf('Colors', module).add('main', () => (
  <div className={style.container}>
    <div className={classnames(style.color_box, style.primary)}>Primary</div>

    <div className={classnames(style.color_box, style.secondary)}>Secondary</div>

    <div className={classnames(style.color_box, style.danger)}>Danger</div>

    <div className={classnames(style.color_box, style.warning)}>Warning</div>
  </div>
));

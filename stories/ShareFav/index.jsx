import React from 'react';
import { storiesOf } from '@storybook/react';

import ShareFav from '../../src/components/ShareFav';
import style from './style.less';

storiesOf('ShareFav', module)
  .add('normal', () => (
    <div className={style.story_container}>
      <ShareFav />
    </div>
  ))
  .add('favorite only', () => (
    <div className={style.story_container}>
      <ShareFav share={false} />
    </div>
  ))
  .add('isFavorite', () => (
    <div className={style.story_container}>
      <ShareFav isFavorite />
    </div>
  ))
  .add('horizontal', () => (
    <div className={style.story_container}>
      <ShareFav horizontal />
    </div>
  ));

import React from 'react';
import ContentLoader from 'react-content-loader';
import className from 'classnames';

import style from './style.less';

const classes = className([style.review_card, style.isLoading]);
const Loading = () => (
  <ContentLoader className={classes} preserveAspectRatio="none">
    <rect height="100%" rx="0" ry="0" width="100%" x="0" y="0" />
  </ContentLoader>
);

export default Loading;

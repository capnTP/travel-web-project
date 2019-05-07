// @flow
import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './style.less';

const Loader = () => (
  <ContentLoader
    className={styles.pre_loader}
    preserveAspectRatio="none"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    speed={2}
  >
    <rect height="45%" rx="3" ry="3" width="100%" x="0" y="0%" />
    <rect height="45%" rx="3" ry="3" width="100%" x="0" y="50%" />
  </ContentLoader>
);

export default Loader;

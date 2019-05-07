import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './style.less';

const Loader = () => (
  <section className={styles.loader}>
    <ContentLoader
      className={styles.image_card}
      preserveAspectRatio="none"
      primaryColor="#efefef"
      secondaryColor="#ddd"
      speed={2}
    >
      <rect height="100%" rx="0" ry="0" width="100%" x="0" y="0" />
    </ContentLoader>
    <section className={styles.content}>
      <div className={styles.left}>
        <ContentLoader
          className={styles.left_loader}
          preserveAspectRatio="none"
          primaryColor="#efefef"
          secondaryColor="#ddd"
          speed={2}
        >
          <rect height="5" rx="4" ry="4" width="100%" x="0" y="5" />
          <rect height="5" rx="4" ry="4" width="30%" x="0" y="11" />
          <rect height="85%" rx="4" ry="4" width="100%" x="0" y="18" />
        </ContentLoader>
      </div>
      <div className={styles.right}>
        <ContentLoader
          className={styles.right_loader}
          preserveAspectRatio="none"
          primaryColor="#efefef"
          secondaryColor="#ddd"
          speed={2}
        >
          <rect height="300" rx="4" ry="4" width="100%" x="0" y="5" />
        </ContentLoader>
      </div>
    </section>
  </section>
);

export default Loader;

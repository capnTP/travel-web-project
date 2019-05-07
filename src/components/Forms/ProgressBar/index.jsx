import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const ProgressBar = ({ count }) => (
  <div className={style.progress_container}>
    <div
      className={style.progress_bar}
      role="progressbar"
      style={{
        width: `${count}%`,
      }}
    />
  </div>
);

ProgressBar.propTypes = {
  count: PropTypes.number,
};

ProgressBar.defaultProps = {
  count: 0,
};

export default ProgressBar;

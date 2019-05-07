import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Alert = ({ icon, description, type }) => (
  <div className={`${style.container} alert_${type}`}>
    <div>
      <span className={`icon ${icon} ${style.dollar}`} />
    </div>
    <div>
      <span
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </div>
  </div>
);

Alert.propTypes = {
  icon: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
};

Alert.defaultProps = {
  icon: 'dollar-sign',
  description: '',
  type: 'main',
};

export default Alert;

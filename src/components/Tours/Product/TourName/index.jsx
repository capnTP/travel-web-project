import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const TourName = ({ tourName, noPadding }) => (
  <div
    className={`
  ${style.content}
  ${noPadding && style.no_padding}
`}
  >
    <h1>{tourName}</h1>
  </div>
);

TourName.propTypes = {
  tourName: PropTypes.string,
  noPadding: PropTypes.bool,
};

TourName.defaultProps = {
  tourName: '',
  noPadding: false,
};

export default TourName;

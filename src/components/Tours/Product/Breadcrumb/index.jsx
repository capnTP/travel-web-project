import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Breadcrumb = ({ country, city, slug }) => (
  <span className={style.breadcrumb}>
    {country}
    <span className={`icon icon-arrow-right-thin ${style.arrow}`} />
    {<a href={`/city/${slug}/`}>{city}</a>}
  </span>
);

Breadcrumb.propTypes = {
  country: PropTypes.string,
  city: PropTypes.string,
  slug: PropTypes.string,
};

Breadcrumb.defaultProps = {
  country: '',
  city: '',
  slug: '',
};

export default Breadcrumb;

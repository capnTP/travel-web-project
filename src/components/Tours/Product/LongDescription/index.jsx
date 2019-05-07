/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import Hr from '../Hr';

import style from './style.less';

const LongDescription = ({ productRef, longDescription, h2Title }) =>
  longDescription ? (
    <div ref={productRef} className={style.direction}>
      <div className={style.direction_content}>
        <h2 className={style.title}>{h2Title}</h2>
        <div className={style.content}>
          {longDescription.map((item, index) => (
            <span
              key={index}
              dangerouslySetInnerHTML={{
                __html: item,
              }}
            />
          ))}
        </div>
      </div>
      <Hr />
    </div>
  ) : null;

LongDescription.propTypes = {
  productRef: PropTypes.func.isRequired,
  longDescription: PropTypes.arrayOf(PropTypes.string),
  h2Title: PropTypes.string,
};
LongDescription.defaultProps = {
  longDescription: [],
  h2Title: '',
};

export default LongDescription;

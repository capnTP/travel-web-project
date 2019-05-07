import React from 'react';
import PropTypes from 'prop-types';

import Hr from '../Hr';

import style from './style.less';

const MoreInformation = ({ productRef, information }) =>
  information.length ? (
    <div ref={productRef} className={style.more_information}>
      {information.map(item => (
        <div key={item.head}>
          <span className={`${style.title} ${style.text_bold} `}>{item.head}</span>
          <div className={style.content}>
            {JSON.parse(item.body || '[]').map(text => (
              <span key={text}>{text}</span>
            ))}
          </div>
        </div>
      ))}
      <Hr />
    </div>
  ) : null;

MoreInformation.propTypes = {
  productRef: PropTypes.func.isRequired,
  information: PropTypes.arrayOf(PropTypes.object),
};
MoreInformation.defaultProps = {
  information: [
    {
      head: '',
      body: '[]',
    },
  ],
};

export default MoreInformation;

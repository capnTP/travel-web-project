import React from 'react';
import PropTypes from 'prop-types';

// import { I18n } from 'react-redux-i18n';
import Hr from '../Hr';

import style from './style.less';

const Highlights = ({ productRef, highlights, t }) =>
  highlights ? (
    <div ref={productRef} className={style.highlights}>
      <span>{t('highlights')}</span>
      <ul>
        {highlights.map(item => (
          <li
            key={item}
            dangerouslySetInnerHTML={{
              __html: item,
            }}
          />
        ))}
      </ul>
      <div className={style.separator} />
      <Hr />
    </div>
  ) : null;

Highlights.propTypes = {
  productRef: PropTypes.func.isRequired,
  highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func,
};
Highlights.defaultProps = {
  t() {},
};

export default Highlights;

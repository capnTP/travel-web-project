import React from 'react';
import PropTypes from 'prop-types';

// import { I18n } from 'react-redux-i18n';
import Hr from '../Hr';

import style from './style.less';

const IncludesExclude = ({ productRef, includes = [], excludes = [], t }) =>
  includes.length || excludes.length ? (
    <div>
      <div
        ref={productRef}
        className={includes.length && excludes.length ? style.include_exclude : style.include}
      >
        {includes.length ? (
          <div className={style.list}>
            <span className={style.title}>{t('includes')}</span>
            <ul>
              {includes.map(item => (
                <li key={item.icon}>
                  <span className={`icon ${item.icon} ${style.span_icon}`} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div />
        )}
        {excludes.length ? (
          <div className={style.list}>
            <span className={`${style.title} ${style.text_bold} `}>{t('excludes')}</span>
            <ul>
              {excludes.map(item => (
                <li key={item.icon}>
                  <span className={`icon ${item.icon} ${style.span_icon}`} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div />
        )}
      </div>
      <Hr />
    </div>
  ) : null;

IncludesExclude.propTypes = {
  productRef: PropTypes.func.isRequired,
  includes: PropTypes.arrayOf(PropTypes.object),
  excludes: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func,
};

IncludesExclude.defaultProps = {
  includes: [],
  excludes: [],
  t() {},
};

export default IncludesExclude;

import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const CompleteSide = ({ t = () => {} }) => (
  <div>
    <div className={style.card}>
      <div className="flex_column">
        <span className="txt_bold font_20">{t('need some help')}</span>
        <span>{t('we are happy to help')}</span>
      </div>
      <div className={`form_group ${style.form}`}>
        <span className="fas fa-envelope txt_asia font_18" />
        <span className="txt_asia font_18">cs@theasia.com</span>
      </div>
    </div>
  </div>
);

CompleteSide.propTypes = {
  t: PropTypes.func,
};

CompleteSide.defaultProps = {
  t() {},
};

export default CompleteSide;

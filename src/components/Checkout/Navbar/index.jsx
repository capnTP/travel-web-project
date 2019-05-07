import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Nav = ({ step, t, goBack }) => (
  <nav className={style.nav}>
    <ul>
      <li>
        <span
          aria-hidden
          className={style.visited}
          onClick={() => (step <= 2 ? goBack(1) : '')}
          role="button"
          to="/"
        >
          {t('product page')}
        </span>
      </li>
      <li>
        <span
          className={`icon icon-arrow-right ${style.arrow} ${
            step === 1 ? style.active : step > 1 ? style.visited : ''
          }`}
        />
      </li>
      <li>
        <span
          aria-hidden
          className={step === 1 ? style.active : step > 1 ? style.visited : ''}
          onClick={() => (step === 2 ? goBack(2) : '')}
          role="button"
        >
          {t('billing information')}
        </span>
      </li>
      <li>
        <span
          className={`icon icon-arrow-right  ${style.arrow} ${
            step === 2 ? style.active : step > 2 ? style.visited : ''
          }`}
        />
      </li>
      <li>
        <span className={step === 2 ? style.active : step > 2 ? style.visited : ''}>
          {t('optional information')}
        </span>
      </li>
      <li>
        <span
          className={`icon icon-arrow-right  ${style.arrow} ${
            step === 3 ? style.active : step > 3 ? style.visited : ''
          }`}
        />
      </li>
      <li>
        <span className={step === 3 ? style.active : step > 3 ? style.visited : ''}>
          {t('payment')}
        </span>
      </li>
      <li>
        <span
          className={`icon icon-arrow-right  ${style.arrow}  ${
            step === 4 ? style.active : step > 4 ? style.visited : ''
          }`}
        />
      </li>
      <li>
        <span className={step === 4 ? style.active : step > 4 ? style.visited : ''}>
          {t('booking complete')}
        </span>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = {
  step: PropTypes.number.isRequired,
  t: PropTypes.func,
  goBack: PropTypes.func,
};

Nav.defaultProps = {
  t: () => {},
  goBack: () => {},
};
export default Nav;

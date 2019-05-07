import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import style from './style.less';

const normalise = v => {
  const value = Number(v);
  // isFinite exclude NaN, isNumber not
  if (!isFinite(value) && isNaN(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 99) {
    return 99;
  }

  return value;
};

const PaxInput = ({ label, onChange, value, isMobile, requirement }) => (
  <div className={style.pax_input}>
    <div className={style.label_div}>
      <ReactTooltip place="top" />
      <span data-class={style.requirement} data-tip={requirement} data-type="success">
        {label}
      </span>
    </div>
    <div className={style.button_minus}>
      <button
        onClick={() => {
          isMobile ? onChange(normalise(value + 1)) : onChange(normalise(value - 1)); // eslint-disable-line no-unused-expressions
        }}
        type="button"
      >
        <span className={`icon ${isMobile ? 'icon-plus' : 'icon-minus'}`} />
      </button>
    </div>
    <div className={style.input_main}>
      <input
        onChange={e => {
          onChange(normalise(e.target.value));
        }}
        value={value}
      />
    </div>
    <div className={style.button_plus}>
      <button
        onClick={() => {
          isMobile ? onChange(normalise(value - 1)) : onChange(normalise(value + 1)); // eslint-disable-line no-unused-expressions
        }}
        type="button"
      >
        <span className={`icon ${isMobile ? 'icon-minus' : 'icon-plus'}`} />
      </button>
    </div>
  </div>
);

PaxInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMobile: PropTypes.bool,
  requirement: PropTypes.string,
};

PaxInput.defaultProps = {
  label: '',
  onChange: () => {},
  value: '0',
  isMobile: false,
  requirement: '',
};

export default PaxInput;

import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Select = ({
  label,
  optionList,
  onChange,
  name,
  isRequired,
  value = '',
  error,
  errMessage,
  placeholder = '',
  isDisabled,
}) => (
  <label className={style.label} htmlFor={label}>
    {label && label} {isRequired && '*'}
    <select
      disabled={isDisabled}
      name={name}
      onBlur={e => onChange(e)}
      onChange={e => onChange(e)}
      required={isRequired}
      value={value}
    >
      <option disabled selected value="">
        {placeholder}
      </option>
      {optionList.map(item => (
        <option key={item.id} disabled={isDisabled} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
    {error && <span className={style.error}>{errMessage}</span>}
  </label>
);

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  optionList: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.bool,
  errMessage: PropTypes.string,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
};

Select.defaultProps = {
  label: '',
  name: '',
  optionList: [],
  onChange: () => {},
  isRequired: false,
  value: '',
  error: false,
  errMessage: '',
  placeholder: '',
  isDisabled: false,
};

export default Select;

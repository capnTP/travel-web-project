import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  isRequired,
  align,
  onFocus,
  error,
  errMessage,
  onBlur,
}) => (
  <label className={type !== 'checkbox' ? style.input_label : ''} htmlFor={label}>
    {label} {isRequired && '*'}
    <input
      checked={type === 'checkbox' && value}
      className={`
        ${style.input}
        ${label && style.margin_top}
        txt_${align}
        ${error && type !== 'checkbox' ? style.error : ''}
      `}
      name={name}
      onBlur={e => onBlur(e)}
      onChange={e => onChange(e)}
      onFocus={onFocus}
      placeholder={placeholder}
      required={isRequired}
      type={type}
      value={value}
    />
    {error && type !== 'checkbox' && <span className={style.error}>{errMessage}</span>}
  </label>
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf([
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  placeholder: PropTypes.string,
  align: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  onFocus: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.bool,
  errMessage: PropTypes.string,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  align: 'left',
  placeholder: '',
  value: '',
  onChange: () => {},
  isRequired: false,
  label: null,
  onFocus: () => {},
  name: '',
  error: false,
  errMessage: '',
  onBlur: () => {},
};

export default Input;

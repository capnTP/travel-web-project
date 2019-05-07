import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '..';

import style from './style.less';

const Input = ({ label, name, type, placeholder, value, onChange, isRequired, align, onFocus }) => (
  <label className={`${type === 'radio' ? style.radio : ''} ${style.input_label}`} htmlFor={label}>
    {label && type !== 'radio' && label} {isRequired && '*'}
    {type !== 'phone' ? (
      <input
        className={`
          ${style.input}
          ${label && style.margin_top}
          txt_${align}
        `}
        name={label}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
        type={type}
        value={value}
      />
    ) : (
      <div className="flex_row justify_space_between align_items_top">
        <div className="grid_3 flex_row">
          <Select type="phoneCode" />
        </div>
        <div className="grid_7 flex_row">
          <input
            className={`
                ${style.input}
                ${label && style.margin_top}
                txt_${align}
              `}
            name={name}
            onBlur={onFocus}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            required={isRequired}
            type="number"
            value={value}
          />
        </div>
      </div>
    )}
    {label && type === 'radio' && label}
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
    'phone',
  ]),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  align: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  name: '',
  align: 'left',
  placeholder: '',
  value: '',
  onChange: () => {},
  onFocus: () => {},
  isRequired: false,
  label: null,
};

export default Input;

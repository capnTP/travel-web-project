import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Textarea = ({ label, placeholder, error, errMessage, name, onChange }) => (
  <label className={style.input_label} htmlFor={label}>
    {label}
    <textarea
      className={error ? style.textError : ''}
      name={name}
      onBlur={e => onChange(e)}
      onChange={e => onChange(e)}
      placeholder={placeholder}
    />
    {error && <span className={style.error}>{errMessage}</span>}
  </label>
);

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errMessage: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

Textarea.defaultProps = {
  label: null,
  placeholder: 'Your Placeholder',
  error: false,
  errMessage: '',
  name: '',
  onChange: () => {},
};

export default Textarea;

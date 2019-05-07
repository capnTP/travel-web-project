/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.less';

const Button = ({ onClick, text, type, icon, disabled, outlined, className, submit }) => {
  let combinedClassName = classnames(
    'btn',
    `btn_${type}`,
    disabled ? style.btn_disabled : '',
    className,
  );

  if (outlined) {
    combinedClassName = classnames(
      style.Button,
      outlined ? style.outlined : '',
      className,
      style[type],
    );
  }

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {icon && <span className={`fas fa-${icon}`} />}
      {text && <span>{text}</span>}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  outlined: PropTypes.bool,
  className: PropTypes.string,
  submit: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  text: null,
  type: 'default',
  icon: null,
  disabled: false,
  outlined: false,
  className: '',
  submit: false,
};

export default Button;

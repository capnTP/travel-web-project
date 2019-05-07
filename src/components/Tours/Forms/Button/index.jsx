import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, text, type, icon }) => (
  <button
    className={`
    btn
    btn_${type}
    `}
    onClick={onClick}
    type="button"
  >
    {icon && <span className={`fas fa-${icon}`} />}
    {text && <span>{text}</span>}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  text: null,
  type: 'default',
  icon: null,
};

export default Button;

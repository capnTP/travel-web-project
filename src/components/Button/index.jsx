/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.less';

const getColorTypeClassName = colorType => {
  if (!colorType) {
    return '';
  }

  return `is-${colorType}`;
};

const Button = React.forwardRef(
  (
    { children, className, outlined, colorType, fullWidth, loading, faded, noBorder, ...rest },
    ref,
  ) => {
    const colorTypeClassName = getColorTypeClassName(colorType);

    return (
      <button
        ref={ref || undefined}
        className={classnames(style.button, {
          [style[colorTypeClassName]]: !!colorTypeClassName,
          [style['is-outlined']]: outlined,
          [style['is-loading']]: loading,
          [style['is-full-width']]: fullWidth,
          [style['is-faded']]: faded,
          [style['is-no-border']]: noBorder,
          [className]: !!className,
        })}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.propTypes = {
  colorType: PropTypes.oneOf(['', 'primary', 'secondary', 'warning', 'danger']),
  children: PropTypes.node,
  className: PropTypes.string,
  /** If `true`, the button will take up the full width of its container. */
  fullWidth: PropTypes.bool,
  outlined: PropTypes.bool,
  loading: PropTypes.bool,
  noBorder: PropTypes.bool,
  faded: PropTypes.bool,
};

Button.defaultProps = {
  colorType: '',
  children: null,
  className: '',
  fullWidth: false,
  outlined: false,
  loading: false,
  noBorder: false,
  faded: false,
};

export default Button;

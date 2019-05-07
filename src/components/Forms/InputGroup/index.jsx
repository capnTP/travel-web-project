/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.less';

/**
 * `<label>{children} {errorMessage}</label>`
 * @return {label} `<label>{children}</label>`
 */
class InputGroup extends React.Component {
  render() {
    const { children, className, errorMessage, errorClassName, label, fullWidth } = this.props;

    return (
      <label
        className={classnames(style.InputGroup, {
          [style['has-error']]: !!errorMessage,
          [style['is-full-width']]: !!fullWidth,
          [className]: !!className,
        })}
      >
        {label}

        {children}

        <div
          className={classnames(style.error_message, {
            [errorClassName]: !!errorClassName,
          })}
        >
          {errorMessage || '&nbsp'}
        </div>
      </label>
    );
  }
}

InputGroup.propTypes = {
  children: PropTypes.element.isRequired,
  /** `className` of `label` element */
  className: PropTypes.string,
  /** `className` of error message element */
  errorClassName: PropTypes.string,
  /** If has value, will display error message */
  errorMessage: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
};

InputGroup.defaultProps = {
  className: '',
  errorClassName: '',
  errorMessage: '',
  fullWidth: false,
  label: '',
};

export default InputGroup;

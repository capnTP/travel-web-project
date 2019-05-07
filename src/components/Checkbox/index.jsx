import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.less';

/**
 * `<input type="checkbox" />` component wrapped with `label`.
 * Every props except `className`, `hasError` and `label` will be `input`'s
 * @return {Checkbox} Checkbox
 */
const Checkbox = ({ className, id, label, hasError, disabled, ...rest }) => (
  <label
    className={classnames({
      [style.Checkbox]: true,
      [className]: !!className,
      [style['has-error']]: !!hasError,
      [style['is-disabled']]: disabled,
    })}
    htmlFor={id}
  >
    <input disabled={disabled} id={id} type="checkbox" {...rest} />

    <span className={classnames(style.check_icon, 'icon', 'icon-tick')} />

    {label && <span className={style.title}>{label}</span>}
  </label>
);

Checkbox.propTypes = {
  /** `className` of root element, in this case `label` */
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /** if true, the component will change to error state */
  hasError: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
  disabled: false,
  hasError: false,
  id: '',
  label: '',
};

export default Checkbox;

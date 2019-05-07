// @flow
import * as React from 'react';
import classnames from 'classnames';

import style from './style.less';

type Props = {
  children: React.ChildrenArray<React.Element<'option'>>,
  className?: string,
  disabled?: boolean,
  focus?: boolean,
  fullWidth?: boolean,
  hover?: boolean,
  loading?: boolean,
  rootClassName?: string,
};

const Select = ({
  children,
  hover,
  focus,
  fullWidth,
  disabled,
  loading,
  className,
  rootClassName,
  ...rest
}: Props) => (
  <div
    className={classnames(style.select, rootClassName || '', {
      [style['is-loading']]: loading,
      [style['is-disabled']]: disabled,
      [style['is-full-width']]: fullWidth,
    })}
  >
    <select
      {...rest}
      className={classnames(className || '', {
        [style['is-hover']]: hover,
        [style['is-focus']]: focus,
        [style['is-disabled']]: disabled,
      })}
      disabled={disabled}
    >
      {children}
    </select>
  </div>
);

Select.defaultProps = {
  className: '',
  disabled: false,
  focus: false,
  fullWidth: false,
  hover: false,
  loading: false,
  rootClassName: '',
};

export default Select;

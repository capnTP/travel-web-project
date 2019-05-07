// @flow
import React from 'react';
import classnames from 'classnames';

import style from './style.less';

type Props = {
  className?: string,
  componentRef?: ?(node: ?HTMLInputElement) => void,
  focus?: boolean,
  hasError?: boolean,
  hover?: boolean,
};

const TextInput = ({ hasError, hover, focus, className, componentRef, ...rest }: Props) => (
  <input
    ref={componentRef}
    className={classnames(style.input, className, {
      [style['is-danger']]: hasError,
      [style['is-hover']]: hover,
      [style['is-focus']]: focus,
    })}
    {...rest}
  />
);

TextInput.defaultProps = {
  className: '',
  componentRef() {},
  hasError: false,
  hover: false,
  focus: false,
};

export default TextInput;

// @flow
import * as React from 'react';
import classnames from 'classnames';

import style from './style.less';

type Props = {
  className?: string,
  componentRef?: (node: ?HTMLTextAreaElement) => void,
  focus?: boolean,
  hasError?: boolean,
  hover?: boolean,
  readonly?: boolean,
};

function TextArea(props: Props) {
  const { hasError, hover, focus, className, componentRef, readonly, ...rest } = props;
  return (
    <textarea
      ref={componentRef}
      className={classnames(style.component, className, {
        [style['is-danger']]: hasError,
        [style['is-focus']]: focus,
        [style['is-hover']]: hover,
        [style['is-read-only']]: readonly,
      })}
      {...rest}
    />
  );
}

TextArea.defaultProps = {
  className: '',
  componentRef() {},
  focus: false,
  hasError: false,
  hover: false,
  readonly: false,
};

export default TextArea;

// @flow
import * as React from 'react';
import classnames from 'classnames';

import style from './style.less';

type Props = {
  children: React.Node,
  className?: string,
  noBorder?: boolean,
};

function Box(props: Props) {
  const { noBorder, className, ...rest } = props;
  return (
    <div className={classnames(style.Box, className, { [style.no_border]: noBorder })} {...rest}>
      {props.children}
    </div>
  );
}

Box.defaultProps = {
  className: '',
  noBorder: false,
};

export default Box;

// @flow
import * as React from 'react';
import classnames from 'classnames';

import Button from '../Button';

import style from './style.less';

type Props = {
  children: React.ChildrenArray<React.Element<typeof Button> | null>,
  className?: string,
};

class ButtonGroup extends React.Component<Props, {}> {
  static defaultProps = {
    className: '',
  };

  render() {
    const { children, className } = this.props;
    return <div className={classnames(style.button_group_component, className)}>{children}</div>;
  }
}

export default ButtonGroup;

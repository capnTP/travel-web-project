import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

class Tab extends React.Component {
  render() {
    return <div className={style.Tab}>{this.props.children}</div>;
  }
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tab;

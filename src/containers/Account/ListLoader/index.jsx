import React from 'react';
import { List } from 'react-content-loader';

import style from './style.less';

class ListLoader extends React.Component {
  render() {
    return (
      <div className={style.component}>
        <List />
      </div>
    );
  }
}

export default ListLoader;

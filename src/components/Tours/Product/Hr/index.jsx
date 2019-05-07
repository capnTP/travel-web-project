import React from 'react';

import smoothScroll from '../../../../helpers/smoothScroller';

import style from './style.less';

class Hr extends React.Component {
  backToTop = () => {
    if (typeof window !== 'undefined') {
      smoothScroll(0, 500);
    }
  };

  render() {
    return (
      <div className={style.hr}>
        <div className={style.line} />
        <div aria-hidden className={style.center} onClick={this.backToTop} role="button">
          <span className="icon icon-arrow-up-outline" />
        </div>
        <div className={style.line} />
      </div>
    );
  }
}

export default Hr;

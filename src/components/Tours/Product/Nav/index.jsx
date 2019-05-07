import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';

import style from './style.less';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listStyle: {},
    };
    this.listElements = {};
    this.listParent = '';
    this.resizeDebounce = '';
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate(prevState) {
    const { activeRef } = prevState;
    const { lastActiveRef } = this.state;
    if (activeRef !== lastActiveRef && Object.keys(this.listElements).length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        lastActiveRef: activeRef,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    clearTimeout(this.resizeDebounce);
    this.resizeDebounce = setTimeout(() => {
      this.setState({
        size: window.innerWidth,
      });
    }, 300);
  };

  getList = () => {
    const { list, activeRef, scrollTo } = this.props;
    // const { lastActiveRef } = this.state;

    return list.map(item => (
      <li
        key={item.name}
        ref={e => {
          if (e) {
            this.listElements[item.id] = e;
          }
        }}
      >
        <a
          className={activeRef === item.id ? style.active : ''}
          onClick={() => scrollTo(item.id)}
          role="button"
          tabIndex={0}
        >
          {item.name}
        </a>
      </li>
    ));
  };

  render() {
    const { productRef, activeRef, stickTop } = this.props;
    const { lastActiveRef = '', size = '' } = this.state;
    const List = this.getList();

    const listStyle = {};
    Object.keys(this.listElements).map(key => {
      const { offsetLeft, offsetWidth } = this.listElements[key];
      const { scrollLeft = 0 } = this.listParent;
      if (scrollLeft > 0) {
        listStyle[key] = { left: offsetLeft - scrollLeft, width: offsetWidth };
      } else {
        listStyle[key] = { left: offsetLeft, width: offsetWidth };
      }
      return key;
    });

    return (
      <div
        key={size}
        ref={productRef}
        className={`${style.tab} ${stickTop ? style.sticky_tab : ''}`}
      >
        <ul
          ref={e => {
            this.listParent = e;
          }}
          className={style.lists}
        >
          {List}
        </ul>
        <Spring from={listStyle[lastActiveRef]} to={listStyle[activeRef]}>
          {styles => <div className={style.active_bar} style={{ ...styles }} />}
        </Spring>
      </div>
    );
  }
}

Nav.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  activeRef: PropTypes.string,
  productRef: PropTypes.func,
  stickTop: PropTypes.bool,
  scrollTo: PropTypes.func,
};

Nav.defaultProps = {
  list: [],
  activeRef: '',
  productRef() {},
  stickTop: false,
  scrollTo() {},
};

export default Nav;

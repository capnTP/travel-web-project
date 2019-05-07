import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';

import style from './style.less';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
    this.onChange = this.onChange.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(item) {
    this.props.onTabsChange(item);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  onChange(e) {
    if (!this.props.disableTabs) {
      this.setState({
        checked: e.target.id,
      });
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div className={`${style.tab_wrapper} ${this.props.className}`}>
        <ul className={style.header}>
          {data
            ? data.map((item, index) => {
                let itemTitle = item.title;
                if (item.title && item.title.indexOf('.') !== -1) {
                  itemTitle = I18n.t(item.title);
                }
                return (
                  <li
                    key={item.id}
                    className={`${this.state.checked === item.id ? `active ${style.active}` : ''}
                       ${this.props.underline ? style.underline : ''}`}
                    onClick={() => {
                      this.onTabClick(item, index);
                    }}
                    role="presentation"
                  >
                    <label
                      className={this.props.disableTabs ? style.disabled : ''}
                      htmlFor={item.id}
                      title={itemTitle}
                    >
                      {itemTitle}
                    </label>
                  </li>
                );
              })
            : null}
        </ul>
        <ul className={style.content}>
          {data
            ? data.map((item, index) => (
                <li
                  key={item.id}
                  className={`${
                    this.props.isAnimate
                      ? this.state.checked !== item.id
                        ? 'slideLeft '
                        : ' slideRight'
                      : ''
                  } `}
                  data-id={item.id}
                >
                  <input
                    checked={this.state.checked === item.id ? 'checked' : ''}
                    className={style.tab_handler}
                    id={item.id}
                    onChange={this.onChange}
                    type="radio"
                    value={item.id}
                  />
                  <div className={` ${style.main_content}`}>{this.props.children[index]}</div>
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

Tabs.propTypes = {
  checked: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  disableTabs: PropTypes.bool,
  isAnimate: PropTypes.bool,
  onTabsChange: PropTypes.func,
  underline: PropTypes.bool,
};

Tabs.defaultProps = {
  checked: '',
  className: '',
  data: PropTypes.any,
  onTabsChange() {},
  disableTabs: false,
  isAnimate: false,
  underline: false,
};

export default Tabs;

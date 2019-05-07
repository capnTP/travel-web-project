import React from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import style from './style.less';

const getTabsFromProps = props => {
  if (!props.children) {
    throw new Error('Tabs children is required');
  }

  if (Array.isArray(props.children)) {
    return props.children;
  }

  return [props.children];
};

class Tabs extends React.Component {
  static Tab = Tab;

  state = {
    activeId: '',
  };

  render() {
    const tabs = getTabsFromProps(this.props);
    let activeId = this.props.activeTabId || this.state.activeId;

    if (!activeId) {
      activeId = tabs[0].props.id;
    }

    return (
      <div className={style.Tabs}>
        <nav>
          <ul>
            {tabs.map(tab => (
              <li
                key={tab.props.id}
                className={activeId === tab.props.id ? style.active : ''}
                onClick={() => {
                  this.setState({ activeId: tab.props.id });
                  this.props.onTabChange(tab.props.id);
                }}
                role="presentation"
              >
                {tab.props.title}
              </li>
            ))}
          </ul>
        </nav>

        <div className={style.body}>{tabs.find(t => t.props.id === activeId).props.children}</div>
      </div>
    );
  }
}

Tabs.propTypes = {
  activeTabId: PropTypes.string,
  onTabChange: PropTypes.func,
};

Tabs.defaultProps = {
  activeTabId: '',
  onTabChange() {},
};

export default Tabs;

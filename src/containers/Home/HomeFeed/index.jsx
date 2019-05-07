import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.less';

class HomeFeed extends Component {
  state = {
    classes: [style.home_feed_main, ''],
  };

  componentDidMount() {
    this.animate(0);
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
  }

  animate = index => {
    const { children = [], speed } = this.props;
    let currentIndex = index;
    const { classes } = this.state;
    this.setState(
      {
        classes: classes.map((c, i) => {
          if (currentIndex !== i) return '';
          return classnames(style.home_feed_main, 'feed-active');
        }),
      },
      () => {
        if (currentIndex === children.length - 1) {
          currentIndex = 0;
        } else {
          currentIndex += 1;
        }
        this.animationTimeout = setTimeout(() => {
          this.animate(currentIndex);
        }, speed);
      },
    );
  };

  render() {
    const { children, className = '' } = this.props;
    return (
      <div className={className}>
        {React.Children.map(children, (item, index) => (
          <div className={classnames(style.home_feed_default, this.state.classes[index])}>
            {item}
          </div>
        ))}
      </div>
    );
  }
}

HomeFeed.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  speed: PropTypes.number,
};

HomeFeed.defaultProps = {
  children: [],
  className: '',
  speed: 500,
};

export default HomeFeed;

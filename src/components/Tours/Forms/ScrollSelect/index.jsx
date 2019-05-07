import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

// eslint-disable-next-line import/prefer-default-export
export class ScrollSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionGroups: {
        count: Array.from(Array(51).keys()),
      },
      valueGroups: {
        count: 2,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
  }

  handleChange = (name, value) => {
    this.setState({
      valueGroups: {
        count: value,
      },
    });
  };

  add = () => {
    const plus = this.state.valueGroups.count + 1;
    this.setState({
      valueGroups: {
        count: plus,
      },
    });
  };

  subtract = () => {
    const minus = this.state.valueGroups.count - 1;
    this.setState({
      valueGroups: {
        count: minus,
      },
    });
  };

  render() {
    const { type } = this.props;

    return (
      <div className={style.scroll_container}>
        <span>{type}</span>
        <div className={style.scroll_header}>
          <button onClick={this.add} type="button">
            <span className="fas fa-angle-up  " />
          </button>
        </div>
        <div className={style.scroll_body} />
        <div className={style.scroll_footer}>
          <button onClick={this.subtract} type="button">
            <span className="fas fa-angle-down" />
          </button>
        </div>
      </div>
    );
  }
}

ScrollSelect.propTypes = {
  type: PropTypes.string,
};

ScrollSelect.defaultProps = {
  type: '',
};

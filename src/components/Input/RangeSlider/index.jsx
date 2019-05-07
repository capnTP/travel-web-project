import PropTypes from 'prop-types';
import React from 'react';
import Range from 'rc-slider/lib/Range';
// import 'rc-slider/assets/index.css';

import style from './style.less';

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValue, min, max } = props;
    this.state = {
      value: defaultValue || [min, max],
    };
  }

  handleChange = value => {
    const { getValue } = this.props;
    this.setState(
      {
        value: value.map(v => Number(v.toFixed(1))),
      },
      () => {
        const { value: returnValue } = this.state;
        getValue(returnValue);
      },
    );
  };

  render() {
    const { min, max, defaultValue, title, valuePostfix, step } = this.props;
    const { value } = this.state;
    const handleStyle = {
      width: 32,
      height: 32,
      marginTop: -15,
      marginLeft: -16,
      border: '2px solid rgb(46, 85, 109)',
    };
    const railStyle = {
      height: 1,
      backgroundColor: 'rgba(54, 52, 54, 0.2)',
    };
    const trackStyle = {
      height: 1,
      backgroundColor: 'rgba(54, 52, 54, 0.2)',
    };
    return (
      <div className={style.range_slider}>
        {title || valuePostfix ? (
          <p>
            <span>{title}</span>
            {valuePostfix ? (
              <span>{`${value
                .map(v => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
                .join(' - ')} ${valuePostfix}`}</span>
            ) : null}
          </p>
        ) : null}
        <div>
          <Range
            defaultValue={defaultValue || [min, max]}
            dots={step !== 1}
            handleStyle={[handleStyle, handleStyle]}
            included={false}
            max={max}
            min={min}
            onChange={this.handleChange}
            railStyle={railStyle}
            step={step}
            trackStyle={[trackStyle, trackStyle]}
          />
        </div>
      </div>
    );
  }
}

RangeSlider.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
  min: PropTypes.number,
  max: PropTypes.number,
  title: PropTypes.string,
  valuePostfix: PropTypes.string,
  step: PropTypes.number,
  getValue: PropTypes.func,
};

RangeSlider.defaultProps = {
  defaultValue: '',
  min: 1,
  max: 100,
  title: '',
  valuePostfix: '',
  step: 1,
  getValue() {},
};

export default RangeSlider;

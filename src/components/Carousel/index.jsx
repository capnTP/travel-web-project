import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import style from './style.less';

class Carousal extends React.Component {
  next = () => {
    const { slickNext = () => {} } = this.slider;
    slickNext();
  };

  prev = () => {
    const { slickPrev = () => {} } = this.slider;
    slickPrev();
  };

  render() {
    const {
      className = '',
      children,
      slidesToScroll = 1,
      slidesToShow = 1,
      infinite = false,
      activeCurrent = false,
      activeOnClick = false,
      nextButton = '',
      prevButton = '',
      responsive = [],
      arrows = false,
      centerMode = false,
      cssEase = 'linear',
      fade = false,
      autoplay,
      autoplaySpeed = 300,
      vertical = false,
    } = this.props;

    const settings = {
      dots: false,
      infinite,
      speed: 500,
      arrows,
      slidesToShow: activeCurrent ? 1 : slidesToShow,
      slidesToScroll: activeCurrent ? 1 : slidesToScroll,
      variableWidth: activeCurrent,
      focusOnSelect: activeOnClick,
      responsive,
      centerMode,
      cssEase,
      fade,
      autoplay,
      autoplaySpeed,
      vertical,
    };

    const classes = classNames(style.carousal, className, {
      [style['active-current']]: activeCurrent,
    });
    return (
      <div className={classes}>
        <Slider
          ref={e => {
            this.slider = e;
          }}
          {...settings}
        >
          {children}
        </Slider>
        {!!prevButton && React.cloneElement(prevButton, { onClick: this.prev })}
        {!!nextButton && React.cloneElement(nextButton, { onClick: this.next })}
      </div>
    );
  }
}

Carousal.propTypes = {
  activeCurrent: PropTypes.bool,
  activeOnClick: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  loop: PropTypes.bool,
  slidesToScroll: PropTypes.number,
  slidesToShow: PropTypes.number,
  nextButton: PropTypes.node,
  prevButton: PropTypes.node,
  arrows: PropTypes.bool,
  responsive: PropTypes.arrayOf(PropTypes.object),
  infinite: PropTypes.bool,
  centerMode: PropTypes.bool,
  cssEase: PropTypes.string,
  fade: PropTypes.bool,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  vertical: PropTypes.bool,
};

Carousal.defaultProps = {
  activeCurrent: false,
  activeOnClick: false,
  className: '',
  loop: false,
  slidesToScroll: 1,
  slidesToShow: 1,
  nextButton: null,
  prevButton: null,
  arrows: false,
  responsive: [],
  infinite: false,
  centerMode: false,
  cssEase: 'linear',
  fade: false,
  autoplay: false,
  autoplaySpeed: 0,
  vertical: false,
};

export default Carousal;

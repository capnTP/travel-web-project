import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';

import style from './style.less';

class Slider extends Component {
  render() {
    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 1,
    };
    if (typeof window !== 'undefined') {
      return (
        <div className={style.slider_container}>
          <Swiper {...params}>{this.props.children}</Swiper>
        </div>
      );
    }
    return null;
  }
}

Slider.propTypes = {
  children: PropTypes.node,
};

Slider.defaultProps = {
  children: '',
};

class ParentSlider extends Component {
  render() {
    if (typeof window !== 'undefined') {
      return (
        <Slider>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 5</div>
          <div>Slide 5</div>
        </Slider>
      );
    }
    return null;
  }
}

export default ParentSlider;

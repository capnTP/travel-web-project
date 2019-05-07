import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Swiper from 'react-id-swiper';

import Reviews from '../Tours/Product/Reviews';

import styles from './style.less';

class LightBox extends Component {
  constructor(props) {
    super(props);

    this.galleryRef = React.createRef();
    this.thumbRef = React.createRef();
  }

  componentDidUpdate = () => {
    if (
      this.galleryRef.current &&
      this.galleryRef.current.swiper &&
      (this.thumbRef.current && this.thumbRef.current.swiper)
    ) {
      this.galleryRef.current.swiper.controller.control = this.thumbRef.current.swiper;
      this.thumbRef.current.swiper.controller.control = this.galleryRef.current.swiper;
    }
  };

  render() {
    const params = {
      lazy: true,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      containerClass: 'gallery',
    };
    const thumbnailSwiperParams = {
      lazy: true,
      paceBetween: 3,
      centeredSlides: true,
      slidesPerView: 7,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      containerClass: 'thumbs',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    };

    const { images, tourName, shortDescription, reviews } = this.props;
    return (
      <Modal
        classNames={{
          modal: 'modal_content',
          overlay: 'modal_container',
          closeIcon: 'modal_close',
        }}
        onClose={this.props.close}
        open={this.props.isOpen}
      >
        <div className={styles.gallery_container}>
          <div className={styles.left}>
            <Swiper ref={this.galleryRef} {...params}>
              {images.map(item => (
                <div key={item.raw} className="swiper-slide">
                  <img alt={item.alt} className="swiper-lazy" data-src={item.raw} />
                  <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
                </div>
              ))}
            </Swiper>
            <Swiper ref={this.thumbRef} {...thumbnailSwiperParams}>
              {images.map(item => (
                <div key={item.raw} className="swiper-slide">
                  <img alt={item.alt} className="swiper-lazy" data-src={item.small} />
                  <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
                </div>
              ))}
            </Swiper>
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              <div className={styles.title}>
                <span>{tourName}</span>
              </div>
              <div className={styles.content}>
                <span>{shortDescription}</span>
              </div>
            </div>
            <Reviews inModal reviews={reviews} side />
          </div>
        </div>
      </Modal>
    );
  }
}

LightBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
  tourName: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
};

LightBox.defaultProps = {
  images: [],
  shortDescription: '',
  reviews: [],
};

class lightBoxParent extends Component {
  render() {
    return (
      <LightBox
        close={this.props.close}
        images={this.props.images}
        isOpen={this.props.isOpen}
        reviews={this.props.reviews}
        shortDescription={this.props.shortDescription}
        tourName={this.props.tourName}
      />
    );
  }
}

lightBoxParent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
  tourName: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
};

lightBoxParent.defaultProps = {
  images: [],
  shortDescription: '',
  reviews: [],
};

export default lightBoxParent;

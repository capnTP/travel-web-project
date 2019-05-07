// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { type TFunction } from 'react-i18next';

import Button from '../../../components/Button';
import SocialButtons from '../../../components/SocialButtons';
import Carousel from '../../../components/Carousel';
import constants from '../../../constants';

import style from './style.less';

type Props = {
  category: Array<{
    categories: Array<{
      id: string,
      imageUrl: string,
      name: string,
    }>,
  }>,
  loadImages: boolean,
  translate: TFunction,
};

const HERO_IMAGE = `${
  constants.IMIGIX_URL
}/pages/home/homepage_experiences.jpg?auto=compress&lossless=1&q=15`;

const Experience = (props: Props) => {
  const { category, translate: t, loadImages } = props;
  const LearnMore = (
    <div className={style.learn_more}>
      <Link
        className="CTA_experiences"
        target="_self"
        to={{
          pathname: '/discover',
          search: '?categoryTypeIds=4',
        }}
      >
        <Button colorType="primary" outlined>
          <span>{t('learn more')}</span>
        </Button>
      </Link>
    </div>
  );

  return (
    <div className={style.experience}>
      <div className={style.card}>
        <div className={style.content}>
          <div className={style.left}>
            <img alt="experience" src={loadImages ? HERO_IMAGE : ''} />
          </div>
          <div className={style.right}>
            <div className={style.title_tag}>
              <span>THE ASIA</span>
              <span className={style.emphasis}>Experiences</span>
            </div>
            <div className={style.content_tag}>
              <span>{t('experience description')}</span>
            </div>
            {LearnMore}
          </div>
        </div>
        <div className={style.social_div}>
          <SocialButtons backColor="primary" color="black" />

          <div className={style.share_tag}>
            <span>{t('share this')}</span>
          </div>
        </div>
      </div>
      <div className={style.slider_container}>
        <Carousel
          activeOnClick
          className={style.slider}
          infinite
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          slidesToScroll={2}
          slidesToShow={4}
        >
          {category.map(({ categories }) =>
            categories.map(({ id, name, imageUrl }) => (
              <Link
                key={id}
                className={style.experience_slider}
                target="_self"
                to={{
                  pathname: '/discover',
                  search: `?categoryIds=${id}`,
                }}
              >
                <img alt={name} src={loadImages ? `${constants.IMIGIX_URL}/${imageUrl}` : ''} />
                <div className={style.slider_info}>
                  <span>{name}</span>
                </div>
              </Link>
            )),
          )}
        </Carousel>
      </div>
      <div className={style.social_content}>
        {LearnMore}

        <div className={style.social_div}>
          <div className={style.share_tag}>
            <span>{t('share this')}</span>
          </div>

          <SocialButtons color="black" />
        </div>
      </div>
    </div>
  );
};

export default Experience;

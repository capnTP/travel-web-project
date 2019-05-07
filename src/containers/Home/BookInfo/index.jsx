// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { type TFunction } from 'react-i18next';

import SocialButtons from '../../../components/SocialButtons';
import Carousel from '../../../components/Carousel';
import Button from '../../../components/Button';
import constants from '../../../constants';

import style from './style.less';

const aboutImage = '/pages/home/homepage_aboutus.jpg?auto=compress&lossless=1&q=15';

type Props = {
  translate: TFunction,
};

const ICONS = [
  {
    name: 'Nature/Adventure Activities',
    icon: 'national-parks',
    description: 'Discover the thrills of the great outdoors',
  },
  {
    name: 'Food & Restaurants',
    icon: 'dinner2',
    description: 'Indulge in the vibrant flavours of Asian cuisine',
  },
  {
    name: 'Shows & Entertainment',
    icon: 'shows',
    description: 'Experience local culture through the performing arts',
  },
  {
    name: 'Water Sports',
    icon: 'snorkeling',
    description: 'Adventure awaits above and below the waves',
  },
  {
    name: 'Cooking Classes',
    icon: 'food-recipe2',
    description: 'Learn to prepare traditional dishes like a local',
  },
  {
    name: 'Local Guides',
    icon: 'guide2',
    description: 'Never miss a detail with the support of a local guide',
  },
  {
    name: 'Transportation',
    icon: 'driver2',
    description: 'Remove stress from your holiday with pre-arranged transfers',
  },
];

const BookInfo = (props: Props) => {
  const { translate: t } = props;

  const ShareDiv = () => (
    <div className={style.social_div}>
      <SocialButtons color="black" />

      <div className={style.share_tag}>
        <span>{t('share this')}</span>
      </div>
    </div>
  );

  return (
    <div className={style.book}>
      <div className={style.mobile_share}>
        <ShareDiv />
      </div>

      <div className={style.content_top}>
        <div className={style.left}>
          <div className={style.title_tag}>
            <span>{t('why book with')}</span>
            <span>TheAsia.com</span>
          </div>
          <div className={style.description_tag}>
            <span
              dangerouslySetInnerHTML={{
                __html: t('booking description'),
              }}
            />
          </div>
          <div className={style.content_button}>
            <Link className="CTA_about" target="_self" to="/about-us/">
              <Button colorType="primary" outlined>
                <span>{t('learn more about us')}</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.thumbnail}>
            <img alt="about us" src={`${constants.IMIGIX_URL}${aboutImage}`} />
          </div>
          <ShareDiv />
        </div>
      </div>

      <div className={style.content_slider}>
        <Carousel
          activeOnClick
          centerMode
          centerPadding="60px"
          className={style.slider}
          infinite
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
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
          slidesToScroll={1}
          slidesToShow={5}
        >
          {ICONS.map(({ icon }) => (
            <div key={icon} className={style.card}>
              <div className={style.wrapper}>
                <div className={style.circle}>
                  <span className={`icon icon-${icon}`} />
                </div>

                <div className={style.circle_name}>
                  <span>{t(`${icon}.name`)}</span>
                  <span>{t(`${icon}.description`)}</span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BookInfo;

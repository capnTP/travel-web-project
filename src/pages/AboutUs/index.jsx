// @flow
import * as React from 'react';
import { type TFunction, Trans, translate } from 'react-i18next';
import classnames from 'classnames';
import { Query, type QueryRenderProps } from 'react-apollo';
import gql from 'graphql-tag';

import Carousel from '../../components/Carousel';
import Review from '../../components/Cards/Review';
import SeoHelper from '../../components/SeoHelper';

import style from './style.less';

type TopRatedProduct = {
  id: string,
  reviews: ?{
    nationalityFlag: string,
    rating: ?number,
    reviewDescription: string,
    reviewerName: string,
  },
  tours: {
    city: string,
    discount: number,
    image: {
      alt: string,
      raw: string,
      small: string,
      thumb: string,
    },
    name: string,
    rating: ?number,
    slug: string,
    startingPrice: number,
  },
};

type Props = {
  info: {
    locale: string,
  },
  t: TFunction,
};

const AboutUs = (props: Props) => {
  const { t, info } = props;

  return (
    <div className={style.about_us_page}>
      <SeoHelper
        description={t('seo.description')}
        isPublished
        keywords={t('seo.description')}
        locale={info.locale}
        ogType="website"
        title={t('seo.title')}
      />

      <section>
        <div className={classnames(style.hero, style.box, style.with_padding)}>
          <div className={style.info}>
            <h1>{t('title')}</h1>

            <div className={style.description}>
              <Trans i18nKey="hero_description">
                <p>t</p>

                <p>t</p>

                <p style={{ color: '#4cac87', fontWeight: 'bold' }}>t</p>

                <p>t</p>
              </Trans>
            </div>
          </div>

          <div className={style.cover}>
            <img
              alt="about-us-hero"
              src="https://theasia.imgix.net/sandbox/pages/aboutus/main.jpg?fit=crop&auto=compress&lossless=1&q=15"
            />
          </div>
        </div>

        <div className={style.apart}>
          <h2>{t('apart_title')}</h2>

          <div className={style.list}>
            <div className={classnames(style.item, style.box)}>
              <div className={style.info}>
                <h3 className={style.green}>{t('apart_p1_title')}</h3>

                <p>{t('apart_p1_description')}</p>
              </div>
            </div>

            <div className={classnames(style.item, style.box)}>
              <div className={style.info}>
                <h3 className={style.orange}>{t('apart_p2_title')}</h3>

                <p>{t('apart_p2_description')}</p>
              </div>
            </div>

            <div className={classnames(style.item, style.box)}>
              <div className={style.info}>
                <h3 className={style.blue}>{t('apart_p3_title')}</h3>

                <p>{t('apart_p3_description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={style.with_gradient}>
        <div className={classnames(style.mission, style.box, style.with_padding)}>
          <div className={style.info}>
            <h2>{t('mission_title')}</h2>

            <Trans i18nKey="mission_description">
              <p>t</p>

              <p>t</p>
            </Trans>
          </div>

          <div className={classnames(style.cover, style.mission)}>
            <img
              alt="about-us-hero"
              src="https://theasia.imgix.net/sandbox/pages/aboutus/mission_1.jpg?fit=crop&auto=compress&lossless=1&q=15"
            />

            <img
              alt="about-us-hero"
              src="https://theasia.imgix.net/sandbox/pages/aboutus/mission_2.jpg?fit=crop&auto=compress&lossless=1&q=15"
            />

            <img
              alt="about-us-hero"
              src="https://theasia.imgix.net/sandbox/pages/aboutus/mission_3.jpg?fit=crop&auto=compress&lossless=1&q=15"
            />

            <img
              alt="about-us-hero"
              src="https://theasia.imgix.net/sandbox/pages/aboutus/mission_4.jpg?fit=crop&auto=compress&lossless=1&q=15"
            />
          </div>
        </div>

        <div className={classnames(style.story, style.box, style.with_padding)}>
          <div className={style.info}>
            <h2>{t('story_title')}</h2>

            <Trans i18nKey="story_description">
              <p>t</p>

              <p>t</p>

              <p>t</p>
            </Trans>
          </div>

          <div className={style.cover}>
            <img
              alt="about-us-hero"
              src="https://theasia.imgix.net/sandbox/pages/aboutus/story.jpg?auto=compress&lossless=1&q=40"
            />
          </div>
        </div>
      </section>

      <section className={style.reviews}>
        <div className={style.box}>
          <h2>
            <Trans i18nKey="reviews_title">
              <strong style={{ margin: '0 0.5em 0 0' }}>What Are They Saying?</strong>
              <span>Reviews and thoughts from our community</span>
            </Trans>
          </h2>

          <Query
            query={gql`
              {
                topRatedProducts {
                  id
                  tours {
                    name
                    slug
                    city
                    discount
                    startingPrice
                    image {
                      raw
                      thumb
                      small
                      alt
                    }
                  }
                  reviews {
                    reviewerName
                    rating
                    nationalityFlag
                    reviewDescription
                  }
                }
              }
            `}
          >
            {({
              loading: loadingTopRatedProducts,
              error,
              data,
            }: QueryRenderProps<{ topRatedProducts: ?(TopRatedProduct[]) }, {}>) => {
              if (loadingTopRatedProducts) {
                return <strong>Loading ...</strong>;
              }

              if (error) {
                return <strong>Can not load latest reviews {JSON.stringify(error)}</strong>;
              }

              const topRatedProducts = (!!data && data.topRatedProducts) || [];

              return (
                <div className={style.slider_container}>
                  <Carousel
                    arrows
                    className={style.reviews}
                    infinite
                    responsive={[
                      {
                        breakpoint: 1200,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
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
                          slidesToShow: 1,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 576,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          arrows: false,
                        },
                      },
                    ]}
                    slidesToScroll={1}
                    slidesToShow={2}
                  >
                    {topRatedProducts.map(item => {
                      const tour = item.tours;

                      return (
                        <div key={item.id} className={style.review_container}>
                          <Review {...item.reviews} currency="USD" tour={tour} translate={t} />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              );
            }}
          </Query>
        </div>
      </section>
    </div>
  );
};

export default translate(['about-us', 'tourCard'])(AboutUs);

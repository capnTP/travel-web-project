// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import type { TFunction } from 'react-i18next';

import TourCard from '../TourCard';
import Star from '../../Forms/Star';
import Button from '../../Button';
import IMG from '../../../constants';
import stringHelper from '../../../helpers/string';

import style from './style.less';
import Loading from './loading';

type Props = {
  currency: string,
  isLoading?: boolean,
  nationalityFlag: string,
  rating: ?number,
  reviewDescription: string,
  reviewerName: string,
  tour: {
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
  translate: TFunction,
};

const Review = (props: Props) => {
  const {
    reviewerName,
    rating,
    reviewDescription,
    nationalityFlag: flag,
    isLoading,
    tour,
    translate,
    currency,
  } = props;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={style.review_card}>
      <div className={style.left}>
        <TourCard
          currency={currency}
          image={tour.image}
          name={tour.name}
          rating={tour.rating}
          slug={tour.slug}
          startingPrice={tour.startingPrice}
          translate={translate}
        />
      </div>
      <div className={style.right}>
        <div className={style.header}>
          <div>
            <img alt={reviewerName} src={`${IMG.IMIGIX_URL}/countries/${flag}`} />
            <span>{reviewerName}</span>
          </div>
          <Star rating={rating} />
        </div>
        <div className={style.content}>
          <span>{`“${stringHelper.padEnd(reviewDescription, 200, '...')}”`}</span>
        </div>
        <div className={style.footer}>
          <Link
            className="CTA_product"
            rel="noopener noreferrer"
            target="_blank"
            to={`/discover/${tour.slug}/`}
          >
            <Button colorType="warning" outlined>
              <span>Read More!</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Review.defaultProps = {
  isLoading: false,
};

export default Review;

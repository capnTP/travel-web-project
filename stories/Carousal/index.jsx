import React from 'react';
import { storiesOf } from '@storybook/react';

import Carousal from '../../src/components/Carousel';
import TourCard from '../../src/components/Cards/TourCard';
import style from './style.less';

const generateData = limit => {
  const data = [];
  for (let i = 0; i < limit; i++) {
    data.push(`http://lorempixel.com/1000/480/nature/${i + 1}/`);
  }
  return data;
};

storiesOf('Carousal', module)
  .add('Single', () => (
    <Carousal className={style.slider}>
      {generateData(8).map(imgSrc => (
        <div>
          <img alt={imgSrc} src={imgSrc} />
        </div>
      ))}
    </Carousal>
  ))
  .add('Promotions', () => (
    <Carousal
      activeCurrent
      activeOnClick
      className={style.slider}
      slidesToScroll={1}
      slidesToShow={1}
    >
      {generateData(8).map(imgSrc => (
        <TourCard
          image={{
            raw: imgSrc,
            thumb: imgSrc,
          }}
          name="Something here"
        />
      ))}
    </Carousal>
  ))
  .add('Tours', () => (
    <Carousal
      className={style.slider}
      nextButton={<span>Next</span>}
      prevButton={<span>Prev</span>}
      slidesToScroll={1}
      slidesToShow={3}
    >
      {generateData(7).map(imgSrc => (
        <TourCard
          image={{
            raw: imgSrc,
            thumb: imgSrc,
          }}
          name="Something here"
        />
      ))}
    </Carousal>
  ));

import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const CITIES = [
  { displayText: 'Bangkok, Thailand', to: '/city/bangkok' },
  { displayText: 'Ho Chi Minh, Vietnam', to: '/city/ho-chi-minh-city' },
  { displayText: 'Danang, Vietnam', to: '/city/danang' },
  { displayText: 'Siem Reap, Cambodia', to: '/city/siem-reap' },
  { displayText: 'Seoul, South Korea', to: '/city/seoul' },
];

const BookingListPlaceholder = ({ title }) => (
  <div className={style.BookingListPlaceholder}>
    <h2 className={style.title}>{title}</h2>

    <div>Let’s change that! Where would you like to go?</div>

    <div className={style.cities}>
      <ul>
        {CITIES.map(c => (
          <li key={c.to}>
            <a href={c.to}>{c.displayText}</a>
          </li>
        ))}
      </ul>
    </div>

    <div>Or you can use the search bar in the page header</div>
  </div>
);

BookingListPlaceholder.propTypes = {
  title: PropTypes.string,
};

BookingListPlaceholder.defaultProps = {
  title: '',
};

export default BookingListPlaceholder;

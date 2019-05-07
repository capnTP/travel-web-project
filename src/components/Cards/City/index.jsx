import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import WeatherIcons from '../../Weather/icons';
import Button from '../../Button';
import stringHelper from '../../../helpers/string';

import style from './style.less';

const CityCard = ({ name, country, description, image, weather = {}, categoryType, slug }) => {
  const { icon, temperature, description: weatherTitle, time = '' } = weather;
  const localTime = time.split(' ');
  let timeDigits = localTime[0];
  let tempInCelsius = temperature;
  try {
    // Removed decimal from temperature
    tempInCelsius = parseInt(tempInCelsius, 10);
    // Transforming time
    timeDigits = timeDigits.split(':');
    const hours = parseInt(timeDigits[0], 10);
    const minutes = parseInt(timeDigits[1], 10);
    if (!minutes) {
      timeDigits = hours;
    } else {
      timeDigits = `${hours}:${timeDigits[1]}`;
    }
  } catch (e) {
    console.log('Unable to convert temperature/time');
  }

  return (
    <div className={style.city_card}>
      {Object.keys(weather).length > 0 && (
        <div className={style.weather}>
          <p>
            <span className={WeatherIcons[icon]} />
            <span>
              {tempInCelsius}
              <small>c</small>
            </span>
          </p>
          <p>{weatherTitle}</p>
          <p>
            <span>{timeDigits}</span>
            <small>{localTime[1]}</small>
          </p>
        </div>
      )}
      <img alt="something" className={style.image} src={image} />
      <div className={style.details}>
        <div>
          {slug ? (
            <Link className="CTA_city" to={`/city/${slug}/`}>
              <h2>{name}</h2>
            </Link>
          ) : (
            <h2>{name}</h2>
          )}
          <span>{country}</span>

          <div className={style.description_container}>
            <div className={style.description}>{stringHelper.padEnd(description, 400, '...')}</div>
          </div>

          {categoryType.length > 0 && (
            <div className={style.categories}>
              <ul>
                {categoryType.map(({ id, name: categoryName }) => (
                  <li key={id}>
                    <Link
                      className="CTA_city"
                      target="_self"
                      to={{
                        pathname: `/city/${slug}`,
                        search: `?categoryTypeIds=${id}`,
                      }}
                    >
                      <Button colorType="primary" outlined>
                        <span>{categoryName}</span>
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CityCard.propTypes = {
  name: PropTypes.string,
  country: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  weather: PropTypes.shape({
    icon: PropTypes.string,
    temperature: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.string,
  }),
  categoryType: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string,
};

CityCard.defaultProps = {
  name: '',
  country: '',
  description: '',
  image: '',
  weather: {},
  categoryType: [],
  slug: '',
};

export default CityCard;

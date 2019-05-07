// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import style from './style.less';

type Image = {
  id: string,
  image: {
    raw: string,
  },
  mainText: string,
  secondaryTextLink: string,
};

type Props = {
  images: Image[],
};

type State = {};

class Slider extends React.Component<Props, State> {
  render() {
    const { images = [] } = this.props;
    return (
      <div className={style.slider_cover}>
        {images.slice(0, 1).map(({ id, image, mainText, secondaryTextLink }) => (
          <div key={id} className={style.slides}>
            <img alt={mainText} src={image.raw} />

            <div className={style.name}>
              <Link to={secondaryTextLink}>{mainText}</Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Slider;

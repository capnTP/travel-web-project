// @flow
import * as React from 'react';
import classnames from 'classnames';

import style from './style.less';

type Props = {
  backColor?: '' | 'white' | 'black' | 'primary',
  color?: 'primary' | 'black',
  language?: 'en' | 'ko' | 'zh' | 'th',
};

type Icon = {
  iconName: string,
  url: string,
  ['en' | 'ko' | 'zh' | 'th']: string,
};

const BUTTONS: Array<Icon> = [
  {
    iconName: 'facebook-outline',
    url: 'https://www.facebook.com/theasiatrip',
    ko: 'https://business.facebook.com/THEASIAKOREA/',
    th: 'https://business.facebook.com/TheasiaTH/',
  },
  {
    iconName: 'instagram-outline',
    url: 'https://www.instagram.com/theasiatrip',
    ko: 'https://www.instagram.com/theasiakorea/',
  },
  {
    iconName: 'twitter-outline',
    url: 'https://twitter.com/TheAsiatrip',
  },
  {
    iconName: 'naver',
    url: 'https://blog.naver.com/theasiatravel',
  },
  {
    iconName: 'youtube',
    url: 'https://www.youtube.com/c/TheAsia',
  },
  {
    iconName: 'wechat-outline',
    url: 'http://weixin.qq.com/r/lD9bQ_7EErNtraog92qG',
  },
];

const SocialButtons = (props: Props) => {
  const { backColor, color } = props;
  const language = props.language || 'en';

  return (
    <ul className={style.social_icon_list}>
      {BUTTONS.map((item: Icon) => (
        <li key={item.iconName}>
          <a
            className="btn_social"
            href={item[language] || item.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span
              className={classnames(
                `icon icon-${item.iconName}`,
                color ? [style[`color_${color}`]] : '',
                backColor ? [style[`bg_${backColor}`]] : '',
              )}
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

SocialButtons.defaultProps = {
  backColor: '',
  color: '',
  language: 'en',
};

export default SocialButtons;

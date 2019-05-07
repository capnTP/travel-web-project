// @flow
import React from 'react';
import { type TFunction } from 'react-i18next';

import style from './style.less';

type Props = {
  date: string,
  hasTour: boolean,
  onClick: () => void,
  t: TFunction,
};

const getDisplayText = (date: string, hasTour: boolean, t: TFunction): string => {
  if (!hasTour) {
    return t('see tours');
  }

  if (hasTour && !date) {
    return t('select dates');
  }

  return date;
};

const BottomBar = ({ onClick, hasTour, date, t }: Props) => (
  <div className={style.product_book}>
    <button onClick={onClick} type="button">
      {getDisplayText(date, hasTour, t)}
    </button>
  </div>
);

export default BottomBar;

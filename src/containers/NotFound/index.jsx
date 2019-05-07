// @flow
import * as React from 'react';
import { I18n } from 'react-i18next';

import SeoHelper from '../../components/SeoHelper';

import style from './style.less';

const NotFound = () => (
  <I18n ns="common">
    {(t, { i18n }) => (
      <div className={style.not_found_page}>
        <SeoHelper title="Page not found · The Asia" />

        <p className={style.text}>
          <span>{i18n.t('oops')}</span>
          <span>{i18n.t('wrongPage')}</span>
          <span>{i18n.t('description')}</span>
        </p>
      </div>
    )}
  </I18n>
);

export default NotFound;

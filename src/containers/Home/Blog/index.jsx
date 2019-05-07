// @flow
import * as React from 'react';
import { type TFunction } from 'react-i18next';

import Button from '../../../components/Button';
import stringHelper from '../../../helpers/string';

import style from './style.less';

type Props = {
  blogs: ?Array<{
    content: string,
    image: {
      raw: string,
      thumb: string,
    },
    title: string,
    url: string,
  }>,
  translate: TFunction,
};

const Blogs = (props: Props) => {
  const { translate: t } = props;
  const blogs = props.blogs || [];

  return (
    <div className={style.blog_container}>
      <div className={style.title_tag}>
        <div className={style.title}>
          <span>{t('what is happenning')}</span>
          <span>{t('what is going on')}</span>
        </div>

        <div className={style.see_all}>
          <a
            className="CTA_blog"
            href="https://blog.theasia.com/"
            rel="noopener noreferrer"
            target="blank"
          >
            {t('see all')} <span className="icon icon-arrow-right-thin" />
          </a>
        </div>
      </div>

      <div className={style.content}>
        {blogs.slice(0, 1).map(({ content, title, url, image: { raw = '', thumb } }) => (
          <div key={title} className={style.card}>
            <div className={style.left}>
              {raw && <img alt={title} data-base={raw} src={thumb} />}
            </div>
            <div className={style.right}>
              <div className={style.title}>{title}</div>
              <div className={style.description}>
                <span>{stringHelper.padEnd(content, 400, '...')}</span>
              </div>
              <div className={style.button}>
                <a className="CTA_blog" href={url} rel="noopener noreferrer" target="_blank">
                  <Button colorType="warning" outlined>
                    <span>{t('continue reading')}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={style.content_bottom}>
        <div className={style.left}>
          {blogs.slice(1, 3).map(({ title, url, image: { raw = '', thumb } }) => (
            <a
              key={title}
              className={style.card}
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={style.thumbnail}>
                {raw && <img alt={title} data-base={raw} src={thumb} />}
              </div>
              <div className={style.blog_title}>
                <span>{title}</span>
                <span>
                  {t('read more')} {'>'}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className={style.right}>
          {blogs.slice(3, 5).map(({ title, url, image: { raw = '', thumb } }) => (
            <a
              key={title}
              className={style.card}
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={style.thumbnail}>
                {raw && <img alt={title} data-base={raw} src={thumb} />}
              </div>
              <div className={style.blog_title}>
                <span>{title}</span>
                <span>
                  {t('read more')} {'>'}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

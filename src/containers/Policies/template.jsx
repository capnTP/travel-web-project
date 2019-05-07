import React from 'react';

import SeoHelper from '../../components/SeoHelper';
import Tabs from '../../components/Tabs';

import style from './style.less';

export default that => {
  const data = that.constructor.translationKeys;
  const {
    t = () => {},
    policiesQuery: { cancellationPolicies: policies = [] } = {},
    info: { locale = 'en' } = {},
  } = that.props;
  return (
    <div className={style.policies}>
      <SeoHelper
        description={t(data.seo.description)}
        isPublished
        keywords={t(data.seo.description)}
        locale={locale}
        ogType="website"
        title={t(data.seo.title)}
      />

      <div className="css_container">
        <h1 className={style.heading}>{t(data.title)}</h1>

        <p>{t(data.details)}</p>

        <div>
          <Tabs checked="1" className={style.main_tab} data={policies}>
            {policies.map(item => {
              const policyDetails = data[item.id];
              const description = t(policyDetails.description);
              const infoGraphic = t(policyDetails.infoGraphic);

              return (
                <div key={item.id} className={style.tab}>
                  <h4 className={style.title}>{item.description}</h4>

                  <ul className={style.list}>
                    {Array.isArray(description) &&
                      description.map(para => <li key={para.split(' ').join('')}>{para}</li>)}
                  </ul>

                  <div className={style.info_graphic}>
                    {Array.isArray(infoGraphic) &&
                      infoGraphic.map((para, index) => (
                        <div key={para.title.split(' ').join('')} className={style.box_info}>
                          {index === 0 && <span>{t(data.example)}</span>}

                          <span className={style.date_title}>{para.title}</span>

                          <div className={style.date_info}>
                            {para.date.map(dates => (
                              <span key={dates.split(' ').join('')}>
                                {dates}
                                <br />
                              </span>
                            ))}
                          </div>

                          <p>{para.text}</p>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// @flow
import * as React from 'react';
import Moment from 'moment';
import { type TFunction } from 'react-i18next';

import googleCommerce from '../../../helpers/googleEcommerce';
import { getCheckoutData, clearCheckoutData } from '../../../helpers/checkoutDataUtil';
import Button from '../../../components/Button';

import style from './style.less';

type Props = {
  state: {
    booking: { bookingNumber: string },
    productTitle: string,
    selectedSubProduct: { title: string, type: string },
    userInput: { adults: number, children: number, date: string, infants: number },
  },
  t: TFunction,
};

class CompleteStep extends React.Component<Props> {
  componentDidMount() {
    const checkoutData = getCheckoutData();

    if (checkoutData) {
      const {
        productId,
        productTitle,
        booking: { id, total },
      } = checkoutData;

      googleCommerce.setAction.checkout.purchase({
        bookingId: id,
        id: productId,
        name: productTitle,
        price: total,
      });

      clearCheckoutData();
    }

    if (window) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { state, t } = this.props;
    return (
      <div>
        <div className={style.checkout_card}>
          <div className={style.header}>
            <span className="txt_bold font_18">{t('thank you, your booking')}</span>
            <div className="form_group">
              <span>{t('thank you for booking')}</span>
            </div>
          </div>
          <div className={style.form}>
            <span className="txt_bold">{t('review your booking')}</span>
            <div className="form_group">
              <ul>
                <li className={style.reference}>
                  <span>{t('reference no')}</span>
                  <span>
                    {'#'}
                    {state.booking.bookingNumber}
                  </span>
                </li>
                <li>
                  <span>{t('tour name')}</span>
                  <span>{state.productTitle}</span>
                </li>
                <li>
                  <span>{t('tour package')}</span>
                  <span>{state.selectedSubProduct.title}</span>
                </li>
                <li>
                  <span>{t('tour type')}</span>
                  <span>{state.selectedSubProduct.type}</span>
                </li>
                <li>
                  <span>{t('tour date')}</span>
                  <span>{Moment(state.userInput.date).format('dddd, Do MMMM YYYY')}</span>
                </li>
                <li>
                  <span>{t('number of passengers')}</span>
                  <span>
                    {state.userInput.adults > 0
                      ? `${t('adults')} : ${state.userInput.adults} `
                      : null}

                    {state.userInput.children > 0
                      ? `${t('children')} : ${state.userInput.children} `
                      : null}

                    {state.userInput.infants > 0
                      ? `${t('infants')} : ${state.userInput.infants} `
                      : null}
                  </span>
                </li>
              </ul>
            </div>
            <div className="form_group">
              <span>{t('click below to see')}</span>
            </div>
            <div className="btn_group">
              <a href="/account">
                <Button colorType="warning" type="button">
                  {t('See Full Details')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompleteStep;

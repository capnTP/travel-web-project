// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { type TFunction } from 'react-i18next';
import { Query, type QueryRenderProps } from 'react-apollo';

import style from './style.less';

type Payment = {
  currencies: string[],
  icon: string,
  id: string,
  name: string,
  type: string,
};

type AvailablePaymentsQueryResult = {
  availablePayments: Array<Payment>,
};

type Props = {
  currencyCode: string,
  onClick: string => void,
  t: TFunction,
};

export default function PaymentList(props: Props) {
  const { onClick, t, currencyCode } = props;

  return (
    <Query
      fetchPolicy="network-only"
      query={gql`
        {
          availablePayments {
            id
            currencies
            icon
            name
            type
          }
        }
      `}
    >
      {(queryRenderProps: QueryRenderProps<AvailablePaymentsQueryResult>) => {
        const { data } = queryRenderProps;
        const availablePayments = (!!data && data.availablePayments) || [];
        return (
          <div className="flex_column full_width">
            <span>{t('select your payment')}*</span>
            <div className={style.payment_container}>
              <ul>
                {availablePayments.map(
                  item =>
                    item.currencies.includes(currencyCode) && (
                      <li key={item.id}>
                        <span aria-hidden onClick={() => onClick(item.type)} role="button">
                          <img alt={item.name} src={item.icon} />
                          <span>{item.name}</span>
                        </span>
                      </li>
                    ),
                )}
              </ul>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

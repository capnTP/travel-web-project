const googleEC = data => {
  if (
    typeof window === 'undefined' ||
    (typeof window !== 'undefined' && !window.dataLayer) ||
    !data
  ) {
    console.log('Data layer func not accessed');
    return function() {};
  }
  const { dataLayer: { push = () => {} } = {} } = window || {};
  return push;
};
let savedPaymentMethod = '';
export default {
  setAction: {
    checkout: {
      step1(data = {}) {
        savedPaymentMethod = '';
        console.log('step1 : ', data);
        const main = {
          event: 'checkout',
          ecommerce: {
            checkout: {
              actionField: { step: 1, option: '' },
              products: [
                {
                  name: data.name,
                  id: data.id,
                  price: data.price,
                },
              ],
            },
          },
        };
        try {
          googleEC(data)(main);
        } catch (e) {
          console.log('Error while pushing in datalayer');
        }
      },
      step2(data = {}) {
        console.log('step2 : ', data);
        const main = {
          event: 'checkout',
          ecommerce: {
            checkout: {
              actionField: { step: 2 },
              products: [
                {
                  name: data.name,
                  id: data.id,
                  price: data.price,
                  currency: data.currencyCode,
                },
              ],
            },
          },
        };
        try {
          googleEC(data)(main);
        } catch (e) {
          console.log('Error while pushing in datalayer');
        }
      },
      step3(data = {}) {
        console.log('step3 : ', data);
        savedPaymentMethod = data.paymentMethod;
        const main = {
          event: 'checkout',
          ecommerce: {
            checkout: {
              actionField: { step: 3, option: data.paymentMethod },
              products: [
                {
                  name: data.name,
                  id: data.id,
                  bookingId: data.bookingId,
                  price: data.price,
                  currency: data.currencyCode,
                },
              ],
            },
          },
        };
        try {
          googleEC(data)(main);
        } catch (e) {
          console.log('Error while pushing in datalayer');
        }
      },
      purchase(data = {}) {
        const dataCopy = data;
        dataCopy.paymentMethod = savedPaymentMethod;
        console.log('purchase : ', dataCopy);
        const main = {
          event: 'purchase',
          ecommerce: {
            purchase: {
              actionField: {
                id: dataCopy.bookingId,
                affiliation: dataCopy.paymentMethod,
              },
              products: [
                {
                  name: dataCopy.name,
                  id: dataCopy.id,
                  price: dataCopy.price,
                },
              ],
            },
          },
        };
        try {
          googleEC(dataCopy)(main);
        } catch (e) {
          console.log('Error while pushing in data layer');
        }
      },
    },
  },
  addImpression(data = {}) {
    console.log('addImpression : ', data);
    const { currencyCode, id, name, price } = data;
    const main = {
      event: 'impression',
      ecommerce: {
        currencyCode,
        impressions: [
          {
            id,
            name,
            price,
          },
        ],
      },
    };
    setTimeout(() => {
      try {
        googleEC(data)(main);
      } catch (e) {
        console.log('Error while pushing in data layer');
      }
    }, 2000);
  },
  addProduct(data = {}) {
    console.log('addProduct : ', data);
    const main = {
      event: 'addToCart',
      ecommerce: {
        currencyCode: data.currencyCode,
        add: {
          products: [
            {
              name: data.name,
              id: data.id,
              price: data.price,
              category: data.category,
              quantity: data.quantity,
            },
          ],
        },
      },
    };
    try {
      googleEC(data)(main);
    } catch (e) {
      console.log('Error while pushing in data layer');
    }
  },
};


const googleEC = (data) => {
  if (typeof window === 'undefined' ||
      (typeof window !== 'undefined' && !window.dataLayer) || !data) {
    console.log('Data layer func not accessed');
    return function () {};
  }
  return window.dataLayer.push;
};

export default {
  setAction: {
    checkout: {
      step1(data) {
        console.log('step1 : ', data);
        googleEC(data)({
          event: 'checkout',
          ecommerce: {
            checkout: {
              actionField: { step: 1, option: '' },
              products: [{
                name: data.name,
                id: data.id,
                price: data.price,
              }],
            },
          },
        });
      },
      step2(data) {
        console.log('step2 : ', data);
        googleEC(data)({
          event: 'checkout',
          ecommerce: {
            checkout: {
              actionField: { step: 2, option: data.paymentMethod },
              products: [{
                name: data.name,
                id: data.id,
                price: data.price,
                currency: data.currencyCode,
              }],
            },
          },
        });
      },
      step3(data) {
        console.log('step3 : ', data);
        googleEC(data)({
          event: 'checkout',
          ecommerce: {
            checkout: {
              actionField: { step: 3, option: data.paymentMethod },
              products: [{
                name: data.name,
                id: data.id,
                bookingId: data.bookingId,
                price: data.price,
                currency: data.currencyCode,
              }],
            },
          },
        });
        googleEC(data)({
          event: 'purchase',
          ecommerce: {
            purchase: {
              actionField: {
                id: data.bookingId,
                affiliation: data.paymentMethod,
              },
              products: [{
                name: data.name,
                id: data.id,
                price: data.price,
              }],
            },
          },
        });
      },
    },
  },
  addImpression(data = {}) {
    console.log('addImpression : ', data);
    googleEC(data)({
      event: 'impression',
      ecommerce: {
        currencyCode: data.currencyCode,
        impressions: [{
          id: data.id,
          name: data.name,
          category: data.category,
          price: data.price,
        }],
      },
    });
  },
  addProduct(data) {
    console.log('addProduct : ', data);
    googleEC(data)({
      event: 'addToCart',
      ecommerce: {
        currencyCode: data.currencyCode,
        add: {
          products: [{
            name: data.name,
            id: data.id,
            price: data.price,
            category: data.category,
            quantity: data.quantity,
          }],
        },
      },
    });
  },
};

/* eslint-disable */
import moment from 'moment';

const price = {
  format: 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
  getActiveVariant(variants) {
    return variants.filter((variant) => {
      if (!variant.status) return false;
      const startDate = moment(variant.starts_on, this.format);
      const endDate = moment(variant.ends_on);
      const today = moment();
      if (!today.isBetween(
              startDate,
              endDate,
              // check only days not full with time and milli seconds
              'days',
              // all inclusive
              '[]',
          )) return false;
      return variant;
    });
  },
  getPriceByMinPax(variants){
    const activeVariants = this.getActiveVariant(variants);
    return activeVariants
        .reduce((acc, variant) => {
          const allPrices = variant.prices || variant.price();
          acc.push(...allPrices);
          return acc;
        }, []).sort((a, b) => a.pax - b.pax)[0];
  },
  getMinActivePrice(variants){
    const activeVariants = this.getActiveVariant(variants);
    const t = activeVariants
        .reduce((acc, variant) => {
          const allPrices = variant.prices || variant.price || variant.price();
          acc.push(...allPrices);
          return acc;
        }, []).sort((a, b) => a.adult_price - b.adult_price);
    return t[0];
  },
  getVariantByPrice(variants) {
    const activePrice = this.getMinActivePrice(variants);
    return variants
        .find(variantItem => {
          const allPrices = variantItem.prices || variantItem.price || variantItem.price();
          return allPrices
              .find(priceItem => activePrice && activePrice.id ? priceItem.id === activePrice.id:false)
        });
      
  },
  getDates(variant) {
    const today = moment();
    const todayName = today.format('dddd').toLowerCase();
    const repeatOn = variant.repeat_on;
    const excludedDates = variant.date_excluded;
    console.log('repeat on, check');
    // checking repeat on
    for (let day = 0,
             len = repeatOn.length;
         day < len;
         day = day + 1) {
      if (repeatOn[day].toLowerCase() === todayName) {
        break;
      } else if (day === len - 1) {
        return false;
      }
    }
    console.log('excluded, check');
    // checking excluded dates on
    for (let date = 0,
             len = excludedDates.length;
         date < len;
         date = date + 1) {
      const excludedDate = moment(excludedDates[date], this.format);
      if (today.isSame(excludedDate, 'day')) {
        return false;
      }
    }
    return variant;
  },
};

// if(typeof window !== 'undefined') {
//   exports['default'] = price;
// }else {
//   module.exports = price
// }
export default price;

import moment from 'moment';

class Price {
  static union(arr = []) {
    return [...new Set(...arr)];
  }

  static intersection(arr = []) {
    if (arr.length === 1) return arr[0];
    const mergedArray = [].concat(...arr);
    return [...new Set(mergedArray)].filter(
      value => mergedArray.indexOf(value) !== mergedArray.lastIndexOf(value),
    );
  }

  static difference(arr = []) {
    const mergedArray = [].concat(...arr);
    return [...new Set(mergedArray)].filter(
      value => mergedArray.indexOf(value) === mergedArray.lastIndexOf(value),
    );
  }

  // Only for inner values not functions
  static deepClone(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      console.error('DEEP CLONE FAILED!!!');
    }
    return Object.assign(Array.isArray(obj) ? [] : {}, obj);
  }

  constructor(subTours = [], userDate = moment()) {
    this.dateFormat = 'YYYY-MM-DD';
    this.dayFormat = 'dddd';
    this.weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    this.subTours = Price.deepClone(subTours);
    this.filteredByDate = [];
    this.filteredByPax = [];
    this.userDate = userDate.clone();
  }

  getCalendar = () => {
    let allPax = [];
    const repeatDays = [];
    const dateExcluded = [];
    const allMaximumPax = [];
    const allStartDate = [];
    const paxInfo = {
      infants: 0,
      children: 0,
    };
    let rangeEndDate = moment();
    this.subTours.forEach(item => {
      const {
        priceInfo: {
          basePrice = [],
          maximumPax = 0,
          repeatOn = [],
          excludeDates = [],
          startDate,
          endDate,
        } = {},
      } = item;

      // Get details for infants and children if they exist in sub tours
      const tourClone = Price.deepClone(item);
      const { priceInfo: { basePrice: mainPrice = [] } = {} } = tourClone;
      mainPrice.forEach(({ selling: { children, infants } }) => {
        paxInfo[tourClone.id] = {
          children: !!children,
          infants: !!infants,
        };
        if (children) {
          paxInfo.children += 1;
        }
        if (infants) {
          paxInfo.infants += 1;
        }
      });

      if (moment(endDate).isAfter(rangeEndDate)) {
        rangeEndDate = moment(endDate);
      }
      allStartDate.push(startDate);
      allPax = allPax.concat(basePrice.map(({ pax }) => pax));
      allMaximumPax.push(maximumPax);
      repeatDays.push(repeatOn);
      dateExcluded.push(excludeDates);
    });
    const startDate = allStartDate.sort((a, b) => moment.utc(a).diff(moment.utc(b)))[0];
    const repeatDaysUnion = Price.union(repeatDays);
    const blockedDays = Price.difference([repeatDaysUnion, this.weekdays]);
    return {
      paxInfo,
      startDate: moment(startDate),
      endDate: rangeEndDate,
      excludeDates: Price.intersection(dateExcluded),
      blockedDays,
      minimumPax: Math.min.apply(null, allPax),
      maximumPax: Math.max.apply(null, allMaximumPax),
    };
  };

  finalPriceSelection = ({ adults = 0, children = 0, infants = 0 }) => {
    const totalPax = Number(adults) + Number(children) + Number(infants);
    if (isNaN(totalPax)) {
      console.error('PRICE SHOULD BE A NUMBER!');
      return this.filteredByDate;
    }
    return this.filteredByDate.reduce((acc, item) => {
      const tourClone = Price.deepClone(item);
      const { priceInfo: { basePrice = [] } = {} } = tourClone;
      const matchedPrice = basePrice.find(({ pax = 0 }) => Number(pax) === totalPax);
      let basePriceClone = [];
      if (matchedPrice) {
        basePriceClone = [matchedPrice];
      } else {
        basePriceClone = basePrice.filter(({ pax }) => totalPax >= Number(pax || 0));
      }

      if (basePriceClone.length) {
        tourClone.finalPrice = basePriceClone.sort((a, b) => (a.pax > b.pax ? 0 : 1))[0];
        acc.push(tourClone);
      }
      return acc;
    }, []);
  };

  filterTourWithPrice = (
    userDate = moment(),
    { adults = 0, children = 0, infants = 0 },
    prices = [],
  ) => {
    this.userDate = userDate.clone();

    // Filter by user selected date
    this.filteredByDate = this.subTours.filter(item => {
      const { priceInfo: { excludeDates = [], repeatOn = [], startDate } = {} } = item;
      const blockedDays = Price.difference([repeatOn, this.weekdays]);
      const userFormatedDate = this.userDate.format(this.dateFormat);
      const userFormatedDay = this.userDate.format(this.dayFormat).toLowerCase();
      return !(
        excludeDates.indexOf(userFormatedDate) > -1 ||
        blockedDays.indexOf(userFormatedDay) > -1 ||
        moment(startDate).isAfter(this.userDate)
      );
    });

    // Merge override prices to respective sub tours
    if (prices && prices.length) {
      this.filteredByDate = this.filteredByDate.reduce((acc, item) => {
        const tourClone = Price.deepClone(item);
        const { priceInfo: { basePrice = [] } = {} } = tourClone;
        const filteredPrices = prices.reduce(
          (innerAcc, { subProductId, prices: overridePrices }) => {
            if (subProductId === tourClone.id) {
              innerAcc.push(...overridePrices);
              // override price pax from base pax if pax are equal
              const duplicatePaxIndex = basePrice.findIndex(priceItem =>
                overridePrices.find(({ pax = 0 }) => pax === priceItem.pax),
              );
              basePrice.splice(duplicatePaxIndex, 1);
            }
            return innerAcc;
          },
          [],
        );
        tourClone.priceInfo.basePrice = tourClone.priceInfo.basePrice.concat(filteredPrices);
        acc.push(tourClone);
        return acc;
      }, []);
    }
    // Filter by user pax in all price pax
    this.filteredByPax = this.finalPriceSelection({
      adults,
      children,
      infants,
    });
    //     this.filteredByDate.reduce((acc, item) => {
    //   const tourClone = Price.deepClone(item);
    //   const { priceInfo: { basePrice = [] } = {} } = tourClone;
    //   const matchedPrice = basePrice.find(({ pax = 0 }) => Number(pax) === totalPax);
    //   if (matchedPrice) {
    //     tourClone.priceInfo.basePrice = [matchedPrice];
    //   } else {
    //     tourClone.priceInfo.basePrice = basePrice.filter(({ pax }) => totalPax >= Number(pax || 0));
    //   }
    //
    //   if (tourClone.priceInfo.basePrice.length) {
    //     tourClone.finalPrice =
    //         tourClone.priceInfo.basePrice.sort((a, b) => (a.pax > b.pax ? 0 : 1))[0];
    //     acc.push(tourClone);
    //   }
    //   return acc;
    // }, []);

    // console.log('this.filteredByBasePax : ', this.filteredByPax);
    return this.filteredByPax;
  };

  // recalculatePrice = ({
  //   adults = 0,
  //   children = 0,
  //   infants = 0,
  // }) => {
  //   const totalPax = Number(adults + children + infants);
  //   const test = this.filteredByDate.reduce((acc, item) => {
  //     const tourClone = Price.deepClone(item);
  //     const { priceInfo: { basePrice = [] } = {} } = tourClone;
  //     const matchedPrice = basePrice.find(({ pax = 0 }) => Number(pax) === totalPax);
  //     if (matchedPrice) {
  //       tourClone.priceInfo.basePrice = [matchedPrice];
  //     } else {
  //       tourClone.priceInfo.basePrice = basePrice.filter(({ pax }) => totalPax >= Number(pax || 0));
  //     }
  //
  //     if (tourClone.priceInfo.basePrice.length) {
  //       tourClone.finalPrice =
  //           tourClone.priceInfo.basePrice.sort((a, b) => (a.pax > b.pax ? 0 : 1))[0];
  //       acc.push(tourClone);
  //     }
  //     return acc;
  //   }, []);
  //   console.log('test: ', test);
  // }
}

export default Price;

// eslint-disable-next-line import/prefer-default-export
export const formatCurrency = (currencyCode, amount) => {
  switch (currencyCode) {
    // Rounding up to nearest 100 e.g. 73478 -> 73500
    case 'KRW':
      return Math.ceil(Number(amount) / 100) * 100;
    // VND and IDR not sure but based on klook for now
    // Round up to nearest 1 e.g. 3.49 => 4
    case 'THB':
      return Math.ceil(Number(amount) / 10) * 10;
    // other currencies defaulted to units place
    case 'VND':
    case 'IDR':
    case 'JPY':
    case 'INR':
    case 'MYR':
    case 'PHP':
    case 'CNY':
    case 'EUR':
    case 'USD':
    case 'SGD':
    default:
      return Math.ceil(Number(amount));
  }
};

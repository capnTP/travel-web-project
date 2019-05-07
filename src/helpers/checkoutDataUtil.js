// @flow
import cookiesHelper from './cookiesHelper';

function clearCheckoutData(): void {
  const cookies = cookiesHelper.get();
  cookies.remove('checkout_selected_subproduct', { path: '/' });
  cookies.remove('checkout_rest', { path: '/' });
}

function getCheckoutData(): ?Object {
  const cookies = cookiesHelper.get();
  const selectedSubProduct = cookies.get('checkout_selected_subproduct');
  const rest = cookies.get('checkout_rest');
  selectedSubProduct.checkoutInfo = cookies.get('checkout_selected_subproduct_checkoutinfo');
  return { ...rest, selectedSubProduct };
}

function setCheckoutData(checkoutData: Object): void {
  const cookies = cookiesHelper.get();
  const {
    selectedSubProduct: { id, title, finalPrice, type, cancellationPolicy, checkoutInfo },
    ...rest
  } = checkoutData;
  cookies.set(
    'checkout_selected_subproduct',
    { id, title, finalPrice, type, cancellationPolicy },
    { path: '/' },
  );
  cookies.set('checkout_rest', rest, { path: '/' });
  cookies.set('checkout_selected_subproduct_checkoutinfo', checkoutInfo, { path: '/' });
}

export { clearCheckoutData, getCheckoutData, setCheckoutData };

import { Platform } from 'react-native';
import Language from '../../utils/localization';

const lang = Language.en;

export const parseCardInfo = info => {
  const { exp_month, exp_year, last4 } = info;
  if (!exp_month || !exp_year || !last4) { return null; }

  const today = new Date();
  let expDate = new Date();
  expDate.setFullYear(exp_year, exp_month, 1);

  return { last4Digits: last4, isExpired: expDate < today };
};

export const PaymentMethodsTypes = {
  applePay: 'ApplePay',
  payPal: 'PayPal',
  addPaymentMethod: 'AddPaymentMethod',
  card: 'Card',
};

export const DefaultPaymentMethods = [
  ...Platform.select({
    android: [],
    ios: [{ type: PaymentMethodsTypes.applePay, title: lang.buyingCredits.applePayTitle }],
  }), { type: PaymentMethodsTypes.payPal, title: lang.buyingCredits.payPalTitle },
];

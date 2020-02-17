import {
  CREATE_PAYMENT_CARD,
  GET_CREDIT_AMOUNT_OPTIONS,
  SET_CREDIT_AMOUNT_OPTIONS,
  GET_PAYMENT_METHODS,
  SET_PAYMENT_METHODS,
  BUY_CREDITS_WITH_CARD,
  SET_NATIVE_PAY_SUPPORT,
  BUY_CREDITS_WITH_TOKEN,
} from '../../redux/types';

export const createPaymentCard = data => ({
  type: CREATE_PAYMENT_CARD,
  data,
});

export const getCreditAmountsOptions = () => ({
  type: GET_CREDIT_AMOUNT_OPTIONS,
});

export const setCreditAmountsOptions = creditAmountOptions => ({
  type: SET_CREDIT_AMOUNT_OPTIONS,
  payload: {
    creditAmountOptions,
  },
});

export const getPaymentMethods = () => ({
  type: GET_PAYMENT_METHODS,
});

export const setPaymentMethods = paymentMethods => ({
  type: SET_PAYMENT_METHODS,
  payload: {
    paymentMethods,
  },
});

export const buyCreditsWithCard = (cardID, credits, amount) => ({
  type: BUY_CREDITS_WITH_CARD,
  payload: {
    cardID,
    credits,
    amount,
  },
});

export const buyCreditsWithToken = (tokenID, credits, amount) => ({
  type: BUY_CREDITS_WITH_TOKEN,
  payload: {
    tokenID,
    credits,
    amount,
  },
});

export const setNativePaySupport = (isSupported) => ({
  type: SET_NATIVE_PAY_SUPPORT,
  payload: {
    isNativePaySupported: isSupported,
  },
});

import {
  SET_CREDIT_AMOUNT_OPTIONS,
  SET_PAYMENT_METHODS,
  SET_NATIVE_PAY_SUPPORT,
  SET_ORDER_DATA,
  SET_USER_DATA,
} from '../../redux/types';

const initialState = {
  creditAmountOptions: null,
  paymentMethods: [],
  isNativePaySupported: false,
  orderData: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREDIT_AMOUNT_OPTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_PAYMENT_METHODS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_NATIVE_PAY_SUPPORT:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ORDER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.data,
      };
    default:
      return state;
  }
};

export default paymentReducer;

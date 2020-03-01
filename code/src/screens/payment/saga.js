import { put, takeLatest, call } from 'redux-saga/effects';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import Language from '../../utils/localization';
import {
  CREATE_PAYMENT_CARD,
  GET_CREDIT_AMOUNT_OPTIONS,
  GET_PAYMENT_METHODS,
  BUY_CREDITS_WITH_CARD,
  BUY_CREDITS_WITH_TOKEN,
  BUY_CREDITS_WITH_PAYPAL,
  CAPTURE_PAYMENT,
} from '../../redux/types';
import {
  addNewPaymentCard,
  getCreditAmountsData,
  getPaymentMethods as getPaymentMethodsCloudFunction,
  payAmount,
  addUserCredits,
  payAmountWithToken,
  getPayPalAccessToken,
} from '../../utils/firebase';

import { createPayPalOrder, capturePayPalPaymentAPI } from '../../utils/webServices';
import {
  createPaymentCard,
  setCreditAmountsOptions,
  setPaymentMethods,
  setNativePaySupport,
  setOrderData,
} from './action';

import { showOrHideModal } from '../../components/customModal/action';
import { parseCardInfo } from '../../utils/helper/payment';
import { NavigationService } from '../../navigator';
import { deviceSupportsNativePay } from '../../utils/payment';
import Constant from '../../utils/constants';

let Lang = Language.en;

function* checkNativePaySupport() {
  const isSupported = yield call(deviceSupportsNativePay);
  yield put(setNativePaySupport(isSupported));
}
function* getCreditAmounts() {
  const creditAmountsString = yield call(getCreditAmountsData);
  const creditAmounts = creditAmountsString ? JSON.parse(creditAmountsString) : null;
  yield put(setCreditAmountsOptions(creditAmounts));
}

function* createPayment({ data }) {
  const { navigation, params } = data;
  yield put(showApiLoader(Lang.apiLoader.loadingText));
  try {
    const response = yield call(addNewPaymentCard, params);
    yield getPaymentMethods();
    yield put(hideApiLoader());
    if (response.ok) {
      yield put(showOrHideModal(Lang.successMessages.cardAddedSuccessfully));
      navigation.goBack();
    } else {
      yield put(showOrHideModal(Lang.errorMessage.serverError));
    }
  } catch (error) {
    yield put(hideApiLoader());
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

function* getPaymentMethods() {
  yield put(showApiLoader(Lang.apiLoader.loadingText));

  yield checkNativePaySupport();

  const response = yield call(getPaymentMethodsCloudFunction);
  yield put(hideApiLoader());

  if (response.ok) {
    let cards = response.data.map(cardInfo => parseCardInfo(cardInfo));
    cards = cards.filter(card => card !== null);
    yield put(setPaymentMethods(cards));
  } else {
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

function* handlePayResponse(response, credits) {
  if (response.ok) {
    response = yield call(addUserCredits, credits);

    if (response.ok) {
      yield put(showOrHideModal(Lang.successMessages.creditAddedSuccessfully));
      NavigationService.goBack();
    }
  }

  if (!response.ok) {
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

function* buyCredits({ payload: { cardID, credits, amount } }) {
  yield put(showApiLoader(Lang.apiLoader.loadingText));
  let response = yield call(payAmount, cardID, amount);
  yield put(hideApiLoader());

  yield handlePayResponse(response, credits);
}

function* buyCreditsWithToken({ payload: { tokenID, credits, amount } }) {
  yield put(showApiLoader(Lang.apiLoader.loadingText));
  let response = yield call(payAmountWithToken, tokenID, amount);
  yield put(hideApiLoader());

  yield handlePayResponse(response, credits);
}

function* buyCreditsWithPayPal({ payload: { credits, amount, navigation } }) {
  yield put(showApiLoader(Lang.apiLoader.loadingText));
  let response = yield call(getPayPalAccessToken);
  yield put(hideApiLoader());
  if (response.ok) {
    let accessToken = response.data.data;
    yield put(showApiLoader(Lang.apiLoader.loadingText));
    let paypalResponse = yield call(createPayPalOrder, accessToken, amount, credits);
    yield put(hideApiLoader());
    yield put(setOrderData(paypalResponse));
    navigation.navigate(Constant.App.screenNames.PayPalApproval);
  } else {
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

function* capturePayPalPayment({ payload: { capturePaymentURL, credits } }) {
  yield put(showApiLoader(Lang.apiLoader.loadingText));
  let tokenResponse = yield call(getPayPalAccessToken);
  yield put(hideApiLoader());
  if (tokenResponse.ok) {
    let accessToken = tokenResponse.data.data;
    yield put(showApiLoader(Lang.apiLoader.loadingText));
    let response = yield call(capturePayPalPaymentAPI, accessToken, capturePaymentURL);
    yield put(hideApiLoader());
    // TODO: Remove after testing
    yield handlePayResponse({ ok: true }, credits);
    if (response.ok) {
      // yield handlePayResponse({ ok: true }, credits);
    } else {
      // yield put(showOrHideModal(Lang.errorMessage.serverError));
    }
  } else {
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

export default function* paymentSaga() {
  yield takeLatest(CREATE_PAYMENT_CARD, createPayment);
  yield takeLatest(GET_CREDIT_AMOUNT_OPTIONS, getCreditAmounts);
  yield takeLatest(GET_PAYMENT_METHODS, getPaymentMethods);
  yield takeLatest(BUY_CREDITS_WITH_CARD, buyCredits);
  yield takeLatest(BUY_CREDITS_WITH_TOKEN, buyCreditsWithToken);
  yield takeLatest(BUY_CREDITS_WITH_PAYPAL, buyCreditsWithPayPal);
  yield takeLatest(CAPTURE_PAYMENT, capturePayPalPayment);
}

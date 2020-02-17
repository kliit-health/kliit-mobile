import { put, takeLatest, call } from 'redux-saga/effects';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import Language from '../../utils/localization';
import {
  CREATE_PAYMENT_CARD,
  GET_CREDIT_AMOUNT_OPTIONS,
  GET_PAYMENT_METHODS,
  BUY_CREDITS_WITH_CARD,
  BUY_CREDITS_WITH_TOKEN,
} from '../../redux/types';
import {
  addNewPaymentCard,
  getCreditAmountsData,
  getPaymentMethods as getPaymentMethodsCloudFunction,
  payAmount,
  addUserCredits,
  payAmountWithToken,
} from '../../utils/firebase';
import {
  createPaymentCard,
  setCreditAmountsOptions,
  setPaymentMethods,
  setNativePaySupport,
} from './action';
import { showOrHideModal } from '../../components/customModal/action';
import { parseCardInfo } from '../../utils/helper/payment';
import { NavigationService } from '../../navigator';
import { deviceSupportsNativePay } from '../../utils/payment';

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

export default function* paymentSaga() {
  yield takeLatest(CREATE_PAYMENT_CARD, createPayment);
  yield takeLatest(GET_CREDIT_AMOUNT_OPTIONS, getCreditAmounts);
  yield takeLatest(GET_PAYMENT_METHODS, getPaymentMethods);
  yield takeLatest(BUY_CREDITS_WITH_CARD, buyCredits);
  yield takeLatest(BUY_CREDITS_WITH_TOKEN, buyCreditsWithToken);
}

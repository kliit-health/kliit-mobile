import { put, takeLatest, call } from 'redux-saga/effects';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import Language from '../../utils/localization';
import { CREATE_PAYMENT_CARD, GET_CREDIT_AMOUNT_OPTIONS, GET_PAYMENT_METHODS } from '../../redux/types';
import { addNewPaymentCard, getCreditAmountsData, getPaymentMethods as getPaymentMethodsCloudFunction } from '../../utils/firebase';
import { createPaymentCard, setCreditAmountsOptions, setPaymentMethods } from './action';
import { showOrHideModal } from '../../components/customModal/action';
import { parseCardInfo } from '../../utils/helper/payment';

let Lang = Language.en;

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
    yield put(hideApiLoader());

    if (response) {
      yield put(createPaymentCard(response));
      navigation.goBack();
    } else {
      yield put(
        createPaymentCard(
          response
        )
      );
    }
  } catch (error) {
    yield put(hideApiLoader());
    yield put(createPayment(false));
  }
}

function* getPaymentMethods() {
  yield put(showApiLoader(Lang.apiLoader.loadingText));

  const response = yield call(getPaymentMethodsCloudFunction);
  yield put(hideApiLoader());

  if (response.ok) {
    let cards = response.data.map(cardInfo => parseCardInfo(cardInfo));
    yield put(setPaymentMethods(cards));
  } else {
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

export default function* paymentSaga() {
  yield takeLatest(CREATE_PAYMENT_CARD, createPayment);
  yield takeLatest(GET_CREDIT_AMOUNT_OPTIONS, getCreditAmounts);
  yield takeLatest(GET_PAYMENT_METHODS, getPaymentMethods);
}

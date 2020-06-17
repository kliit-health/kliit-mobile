import { UPDATE_INSURANCE } from "../../redux/types";
import { put, takeEvery } from "redux-saga/effects";
import Language from "../../utils/localization";
import {
  showApiLoader,
  hideApiLoader,
} from "../../components/customLoader/action";
import { addHealthHistory } from "../../utils/firebase";
import { showOrHideModal } from "../../components/customModal/action";
import firebase from "react-native-firebase";

let Lang = Language["en"];

function* updateInsurance({ data }) {
  try {
    const { InsuranceParams, navigation } = data;
    const user = firebase.auth().currentUser;
    const response = yield addHealthHistory(InsuranceParams, user.uid);

    yield put(showApiLoader(Lang.apiLoader.loadingText));
    yield put(hideApiLoader());
    if (response.success) {
      navigation.goBack();
    } else {
      yield put(
        showOrHideModal(
          response.message ? response.message : Lang.errorMessage.serverError
        )
      );
    }
  } catch (error) {
    yield put(hideApiLoader());
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

export default function* insuranceSaga() {
  yield takeEvery(UPDATE_INSURANCE, updateInsurance);
}

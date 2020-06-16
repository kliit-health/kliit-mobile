import { UPDATE_BASIC_INFO } from "../../redux/types";
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

function* updateBasicInfo({ data }) {
  try {
    const { basicInfoParams, navigation } = data;
    const user = firebase.auth().currentUser;
    const response = yield addHealthHistory(basicInfoParams, user.uid);

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

export default function* basicInfoSaga() {
  yield takeEvery(UPDATE_BASIC_INFO, updateBasicInfo);
}

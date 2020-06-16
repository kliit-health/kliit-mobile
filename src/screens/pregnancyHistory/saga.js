import { UPDATE_PREGNANCY_HISTORY } from "../../redux/types";
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

function* updatePregnancyHistory({ data }) {
  try {
    const { pregnancyHistoryParams, navigation } = data;
    const user = firebase.auth().currentUser;
    const response = yield addHealthHistory(pregnancyHistoryParams, user.uid);

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

export default function* pregnancyHistorySaga() {
  yield takeEvery(UPDATE_PREGNANCY_HISTORY, updatePregnancyHistory);
}

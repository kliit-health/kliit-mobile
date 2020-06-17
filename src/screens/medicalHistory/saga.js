import { UPDATE_MEDICAL_HISTORY } from "../../redux/types";
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

function* updateMedicalHistory({ data }) {
  try {
    const { MedicalHistoryParams, navigation } = data;
    const user = firebase.auth().currentUser;
    const response = yield addHealthHistory(MedicalHistoryParams, user.uid);

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

export default function* medicalHistorySaga() {
  yield takeEvery(UPDATE_MEDICAL_HISTORY, updateMedicalHistory);
}

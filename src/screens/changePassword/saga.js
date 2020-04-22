import { put, takeEvery } from "redux-saga/effects";
import { CHANGE_PASSWORD } from "../../redux/types";
import Language from "../../utils/localization";
import {
  showApiLoader,
  hideApiLoader
} from "../../components/customLoader/action";
import { changePassword, reAunthenticate } from "../../utils/firebase";
import { showOrHideModal } from "../../components/customModal/action";
import { displayConsole } from "../../utils/helper";

let Lang = Language["en"];
const delay = ms => new Promise(res => setTimeout(res, ms));
function* changeUserPassword({ data }) {
  try {
    // const { params, this_ } = data;
    const { params, navigation } = data;
    displayConsole("data", data);
    yield put(showApiLoader(Lang.apiLoader.loadingText));
    const responseReAunthenticate = yield reAunthenticate(
      params.currentPassword
    );
    displayConsole("responseReAunthenticate", responseReAunthenticate);
    if (responseReAunthenticate.success) {
      const responseChangePassword = yield changePassword(params.newPassword);
      displayConsole("responseChangePassword", responseChangePassword);
      yield delay(500);
      yield put(hideApiLoader());
      yield delay(500);
      if (responseChangePassword.success) {
        // this_.setState({
        //     currentPassword: '',
        //     newPassword: '',
        // });
        yield put(
          showOrHideModal(Lang.changePassword.passwordUpdateSuccessfullyMsg)
        );
        navigation.goBack();
      } else {
        yield put(
          showOrHideModal(
            responseChangePassword.message
              ? responseChangePassword.message
              : Lang.errorMessage.serverError
          )
        );
      }
    } else {
      yield delay(500);
      yield put(hideApiLoader());
      yield delay(500);
      yield put(
        showOrHideModal(
          responseReAunthenticate.message
            ? responseReAunthenticate.message
            : Lang.errorMessage.serverError
        )
      );
    }
  } catch (error) {
    yield delay(500);
    yield put(hideApiLoader());
    yield delay(500);
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

export default function* changePasswordSaga() {
  yield takeEvery(CHANGE_PASSWORD, changeUserPassword);
}

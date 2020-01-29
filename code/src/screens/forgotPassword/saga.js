import { put, takeEvery } from 'redux-saga/effects';
import Language from '../../utils/localization';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import { showOrHideModal } from '../../components/customModal/action';
import { displayConsole } from '../../utils/helper';
import { FORGOT_PASSWORD } from '../../redux/types';
import { resetPassword } from '../../utils/firebase';
import { forgotPasswordApiHitSuccess } from './action';

let Lang = Language['en'];

function* forgotPassword({ data }) {
    try {
        const { email } = data;
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        const response = yield resetPassword(email);
        yield put(hideApiLoader());
        if (response.success) {
            yield put(forgotPasswordApiHitSuccess());
            yield put(showOrHideModal(Lang.forgotPassword.resetEmailSentMessage));
        } else {
            yield put(showOrHideModal(
                response.message ? response.message
                    : Lang.errorMessage.serverError,
            ));
        }
    } catch (error) {
        yield put(hideApiLoader());
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }
}

export default function* forgotPasswordSaga() {
    yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

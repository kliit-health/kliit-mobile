import { GET_EXPERTS_DETAIL_DATA } from "../../redux/types";

import { put, takeEvery } from 'redux-saga/effects';
import Language from '../../utils/localization';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import { getDataFromTable } from '../../utils/firebase';
import { showOrHideModal } from '../../components/customModal/action';
import { getExpertsDataSuccess } from "./action";

let Lang = Language['en'];

function* getExperts({ data }) {
    try {
        const { expertsParams } = data;
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        const response = yield getDataFromTable(expertsParams)
        yield put(hideApiLoader());
        if (response) {
            yield put(getExpertsDataSuccess(response));
        } else {
            yield put(showOrHideModal(
                responseImage.message ? responseImage.message
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

export default function* expertProfileSaga() {
    yield takeEvery(GET_EXPERTS_DETAIL_DATA, getExperts);
}
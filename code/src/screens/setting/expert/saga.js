import { put, takeEvery } from 'redux-saga/effects';
import Language from '../../../utils/localization';
import { showApiLoader, hideApiLoader } from '../../../components/customLoader/action';
import { addUserData, uploadImage, getDataFromTable } from '../../../utils/firebase';
import { showOrHideModal } from '../../../components/customModal/action';
import Constant from '../../../utils/constants';
import { displayConsole } from '../../../utils/helper';
import firebase from 'react-native-firebase';
import { setUserData } from '../../authLoading/action';
import { UPDATE_EXPERT_DETAIL_DATA } from "../../../redux/types";

let Lang = Language['en'];

function* updateExpertData({ data }) {
    try {
        const { userParams, imageParams, navigation } = data;
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        const responseImage = yield uploadImage(imageParams)
        displayConsole('responseImage', responseImage);
        if (responseImage.success) {
            const user = firebase.auth().currentUser;
            const { downloadURL } = responseImage.data;
            displayConsole('datadownloadURL', downloadURL);
            displayConsole('responseImage.data', responseImage.data);
            userParams.profileInfo.profileImageUrl = downloadURL;
            displayConsole('userParams', userParams);
            const response = yield addUserData(userParams);
            displayConsole('response', response);
            yield put(hideApiLoader());
            if (response.success) {
                navigation.goBack();
                const obj = {
                    tableName: Constant.App.firebaseTableNames.users,
                    uid: user.uid,
                }
                const userData = yield getDataFromTable(obj);
                displayConsole('userData', userData);
                yield put(setUserData(userData));
            } else {
                yield put(showOrHideModal(
                    response.message ? response.message
                        : Lang.errorMessage.serverError,
                ));
            }
        } else {
            yield put(hideApiLoader());
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
export default function* settingExpertSaga() {
    yield takeEvery(UPDATE_EXPERT_DETAIL_DATA, updateExpertData);
}

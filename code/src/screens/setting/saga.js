import { UPDATE_USER_DETAIL_DATA } from "../../redux/types";
import { put, takeEvery } from 'redux-saga/effects';
import Language from '../../utils/localization';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import { addUserData, uploadImage, getDataFromTable } from '../../utils/firebase';
import { showOrHideModal } from '../../components/customModal/action';
import Constant from '../../utils/constants';
import { displayConsole } from '../../utils/helper';
import firebase from 'react-native-firebase';
import { setUserData } from '../authLoading/action';

let Lang = Language['en'];

function* updateUserData({ data }) {
    try {
        const { userParams, imageParams, navigation } = data;
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        if (imageParams) {
            const responseImage = yield uploadImage(imageParams)
            console.log('responseImage', responseImage);
            if (responseImage.success) {
                const user = firebase.auth().currentUser;
                const { downloadURL } = responseImage.data;
                displayConsole('datadownloadURL', downloadURL);
                displayConsole('responseImage.data', responseImage.data);
                const userRegistrationParams = {
                    credits: Constant.App.credits,
                    uid: user.uid,
                    role: "User",
                    isActive: false,
                    profileInfo: {
                        profileImageUrl: downloadURL,
                        firstName: userParams.firstName,
                        lastName: userParams.lastName,
                        dob: userParams.dob,
                        pronouns: userParams.pronouns,
                        isActive: false,
                        state: userParams.state
                    }
                }
                const response = yield addUserData(userRegistrationParams);
                // displayConsole('response', response);
                console.log('response', response);
                yield put(hideApiLoader());
                if (response.success) {
                    const obj = {
                        tableName: Constant.App.firebaseTableNames.users,
                        uid: user.uid,
                    }
                    const userData = yield getDataFromTable(obj);
                    console.log('userData', userData);
                    yield put(setUserData(userData));
                    navigation.goBack();
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
        } else {
            const user = firebase.auth().currentUser;
            const userRegistrationParams = {
                credits: Constant.App.credits,
                uid: user.uid,
                role: "User",
                isActive: false,
                profileInfo: {
                    profileImageUrl: userParams.profileImageUrl,
                    firstName: userParams.firstName,
                    lastName: userParams.lastName,
                    dob: userParams.dob,
                    pronouns: userParams.pronouns,
                    isActive: false,
                    state: userParams.state
                }
            }
            const response = yield addUserData(userRegistrationParams);
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
        }

    } catch (error) {
        yield put(hideApiLoader());
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }
}
export default function* settingSaga() {
    yield takeEvery(UPDATE_USER_DETAIL_DATA, updateUserData);
}

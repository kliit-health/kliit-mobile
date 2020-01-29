import { put, takeEvery, select } from 'redux-saga/effects';
import { UPLOAD_USER_DETAIL_DATA } from '../../redux/types';
import Language from '../../utils/localization';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import { addUserData, uploadImage, getDataFromTable , makeid } from '../../utils/firebase';
import { showOrHideModal } from '../../components/customModal/action';
import Constant from '../../utils/constants';
import { displayConsole } from '../../utils/helper';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import { setUserData } from '../authLoading/action';

let Lang = Language['en'];

function* uploadUserData({ data, dispatch }) {
    try {
        const { userParams, navigation, imageParams } = data;
        const state = yield select();
        const fcmToken = state.authLoadingReducer.fcmToken;
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        if (imageParams) {
            const responseImage = yield uploadImage(imageParams)
            displayConsole('responseImage', responseImage);
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
                    referalCode: yield makeid(),
                    profileInfo: {
                        profileImageUrl: downloadURL,
                        firstName: userParams.firstName,
                        lastName: userParams.lastName,
                        dob: userParams.dob,
                        pronouns: userParams.pronouns,
                        isActive: false,
                        state: userParams.state,
                        email: user.email,
                    },
                    fcmToken,
                }
                const response = yield addUserData(userRegistrationParams);
                displayConsole('response', response);
                yield put(hideApiLoader());
                if (response.success) {
                    const obj = {
                        tableName: Constant.App.firebaseTableNames.users,
                        uid: user.uid,
                    }
                    const userData = yield getDataFromTable(obj);
                    displayConsole('userData', userData);
                    yield put(setUserData(userData));
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: Constant.App.screenNames.GetStarted }),
                        ],
                    });
                    navigation.dispatch(resetAction);
                } else {
                    dispatch(showOrHideModal(
                        response.message ? response.message
                            : Lang.errorMessage.serverError,
                    ));
                }
            } else {
                yield put(hideApiLoader());
                dispatch(showOrHideModal(
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
                referalCode: yield makeid(),
                profileInfo: {
                    profileImageUrl: "",
                    firstName: userParams.firstName,
                    lastName: userParams.lastName,
                    dob: userParams.dob,
                    pronouns: userParams.pronouns,
                    isActive: false,
                    state: userParams.state,
                    email: user.email,
                },
                fcmToken,
            }
            const response = yield addUserData(userRegistrationParams);
            displayConsole('response', response);
            yield put(hideApiLoader());
            if (response.success) {
                const obj = {
                    tableName: Constant.App.firebaseTableNames.users,
                    uid: user.uid,
                }
                const userData = yield getDataFromTable(obj);
                displayConsole('userData', userData);
                yield put(setUserData(userData));
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: Constant.App.screenNames.GetStarted }),
                    ],
                });
                navigation.dispatch(resetAction);
            } else {
                dispatch(showOrHideModal(
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

export default function* addProfileSaga() {
    yield takeEvery(UPLOAD_USER_DETAIL_DATA, uploadUserData);
}

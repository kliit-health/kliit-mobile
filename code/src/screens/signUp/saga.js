import { put, takeEvery, select } from 'redux-saga/effects';
import { CREATE_USER } from '../../redux/types';
import Language from '../../utils/localization';
import {
  showApiLoader,
  hideApiLoader,
} from '../../components/customLoader/action';
import {
  createUser,
  checkReferedUserData,
  checkSecretKey,
  addUserData,
  deleteUser,
} from '../../utils/firebase';
import { showOrHideModal } from '../../components/customModal/action';
import Constant from '../../utils/constants';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import { displayConsole } from '../../utils/helper';

let Lang = Language.en;
function* signUp({ data }) {
  try {
    const { params, navigation, referralCode, secretKey } = data;
    yield put(showApiLoader(Lang.apiLoader.loadingText));
    const response = yield createUser(params);
    // yield put(hideApiLoader());
    const { uid } = response;
    if (uid) {
      if (referralCode) {
        const response = yield checkReferedUserData({ referralCode });
        if (response.success) {
          if (response.data) {
            const userRegistrationParams = {
              referedCode: referralCode,
              uid,
            };
            const response = yield addUserData(userRegistrationParams);
            displayConsole('response-------', response);
            yield put(hideApiLoader());
            if (response.success) {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: Constant.App.screenNames.AddProfileData,
                  }),
                ],
              });
              navigation.dispatch(resetAction);
            } else {
              put(
                showOrHideModal(
                  response.message
                    ? response.message
                    : Lang.errorMessage.serverError
                )
              );
            }
          } else {
            yield deleteUser();
            yield put(hideApiLoader());
            yield put(showOrHideModal(Lang.errorMessage.invalidReferralCode));
          }
        } else {
          yield deleteUser();
          yield put(hideApiLoader());
          yield put(
            showOrHideModal(
              response.message
                ? response.message
                : Lang.errorMessage.serverError
            )
          );
        }
      }
      // else if (secretKey) {
      //     const response = yield checkSecretKey({ secretKey });
      //     if (response.success) {
      //         if (response.data) {
      //             yield put(hideApiLoader());
      //             const resetAction = StackActions.reset({
      //                 index: 0,
      //                 actions: [
      //                     NavigationActions.navigate({ routeName: Constant.App.screenNames.AddProfileData }),
      //                 ],
      //             });
      //             navigation.dispatch(resetAction);
      //         } else {
      //             yield deleteUser();
      //             yield put(hideApiLoader());
      //             yield put(
      //                 showOrHideModal(Lang.errorMessage.invalidSecretKey),
      //             );
      //         }

      //     } else {
      //         yield deleteUser();
      //         yield put(
      //             showOrHideModal(
      //                 response.message ? response.message
      //                     : Lang.errorMessage.serverError,
      //             ),
      //         );
      //     }
      // }
      else {
        yield put(hideApiLoader());
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: Constant.App.screenNames.AddProfileData,
            }),
          ],
        });
        navigation.dispatch(resetAction);
      }
    } else {
      yield put(hideApiLoader());
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

export default function* signupSaga() {
  yield takeEvery(CREATE_USER, signUp);
}

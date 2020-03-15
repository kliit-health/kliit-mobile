import { put, takeLatest } from 'redux-saga/effects';
import { CREATE_USER } from '../../redux/types';
import Language from '../../utils/localization';
import {
  showApiLoader,
  hideApiLoader,
} from '../../components/customLoader/action';
import {
  createUser,
  checkReferedUserData,
  addUserData,
  deleteUser,
  updateCredits,
} from '../../utils/firebase';
import { showOrHideModal } from '../../components/customModal/action';
import Constant from '../../utils/constants';
import { StackActions, NavigationActions } from 'react-navigation';

let Lang = Language.en;
function* signUp({ data }) {
  try {
    const { params, navigation, referalCode } = data;
    yield put(showApiLoader(Lang.apiLoader.loadingText));
    const newUser = yield createUser(params);
    const { uid } = newUser;
    if (uid) {
      if (referalCode) {
        const referrerData = yield checkReferedUserData({ referalCode });
        if (referrerData.success) {
          if (referrerData.data) {
            const referrerCredits = referrerData.data.credits;
            console.log('referrer  creidts: ', referrerCredits);
            const userRegistrationParams = {
              referedCode: referalCode,
              uid,
            };
            const updateCreditsResponse = yield updateCredits(referrerCredits + Constant.App.referalCredits, referrerData.data.uid);
            if (updateCreditsResponse.ok) {
              const response = yield addUserData(userRegistrationParams);
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
                yield put(hideApiLoader());
              } else {
                yield put(hideApiLoader());
                yield put(
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
              yield put(showOrHideModal(Lang.errorMessage.invalidreferalCode));
            }
          } else {
            yield deleteUser();
            yield put(hideApiLoader());
            yield put(showOrHideModal(Lang.errorMessage.invalidreferalCode));
          }
        } else {
          yield deleteUser();
          yield put(hideApiLoader());
          yield put(
            showOrHideModal(
              referrerData.message
                ? referrerData.message
                : Lang.errorMessage.serverError
            )
          );
        }
      } else {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: Constant.App.screenNames.AddProfileData,
            }),
          ],
        });
        navigation.dispatch(resetAction);
        yield put(hideApiLoader());
      }
    } else {
      yield put(hideApiLoader());
      yield put(
        showOrHideModal(
          newUser.message ? newUser.message : Lang.errorMessage.serverError
        )
      );
    }
  } catch (error) {
    yield put(hideApiLoader());
    yield put(showOrHideModal(Lang.errorMessage.serverError));
  }
}

export default function* signupSaga() {
  yield takeLatest(CREATE_USER, signUp);
}

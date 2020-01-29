import { all } from 'redux-saga/effects';
import loginSaga from '../../screens/login/saga';
import askSaga from '../../screens/ask/saga';
import askExpertSaga from '../../screens/ask/expert/saga';
import accountSaga from '../../screens/account/saga';
import forgotPasswordSaga from '../../screens/forgotPassword/saga';
import sigupSaga from '../../screens/signUp/saga';
import addProfileSaga from '../../screens/addProfileData/saga';
import chooseExpertSaga from '../../screens/chooseExpert/saga';
import expertProfileSaga from '../../screens/expertProfile/saga';
import settingSaga from '../../screens/setting/saga';
import settingExpertSaga from '../../screens/setting/expert/saga';
import changePasswordSaga from '../../screens/changePassword/saga';
import chatSaga from '../../screens/chat/saga';
import chatExpertSaga from '../../screens/chat/expert/saga';


export default function* rootSaga() {
  yield all([
    loginSaga(),
    askSaga(),
    askExpertSaga(),
    accountSaga(),
    forgotPasswordSaga(),
    sigupSaga(),
    addProfileSaga(),
    chooseExpertSaga(),
    expertProfileSaga(),
    settingSaga(),
    settingExpertSaga(),
    changePasswordSaga(),
    chatSaga(),
    chatExpertSaga(),
  ]);
}

import { all } from "redux-saga/effects";
import accountSaga from "../../screens/account/saga";
import addProfileSaga from "../../screens/addProfileData/saga";
import askExpertSaga from "../../screens/ask/expert/saga";
import askSaga from "../../screens/ask/saga";
import basicInfoSaga from "../../screens/basicInfo/saga";
import changePasswordSaga from "../../screens/changePassword/saga";
import chatSaga from "../../screens/chat/saga";
import chatExpertSaga from "../../screens/chat/expert/saga";
import chooseExpertSaga from "../../screens/chooseExpert/saga";
import expertProfileSaga from "../../screens/expertProfile/saga";
import forgotPasswordSaga from "../../screens/forgotPassword/saga";
import lifestyleSaga from "../../screens/lifestyle/saga";
import loginSaga from "../../screens/login/saga";
import paymentSaga from "../../screens/payment/saga";
import pregnancyHistorySaga from "../../screens/pregnancyHistory/saga";
import settingExpertSaga from "../../screens/setting/expert/saga";
import settingSaga from "../../screens/setting/saga";
import signupSaga from "../../screens/signUp/saga";

export default function* rootSaga() {
  yield all([
    accountSaga(),
    addProfileSaga(),
    askExpertSaga(),
    askSaga(),
    basicInfoSaga(),
    changePasswordSaga(),
    chatSaga(),
    chatExpertSaga(),
    chooseExpertSaga(),
    expertProfileSaga(),
    forgotPasswordSaga(),
    lifestyleSaga(),
    loginSaga(),
    paymentSaga(),
    pregnancyHistorySaga(),
    settingExpertSaga(),
    settingSaga(),
    signupSaga(),
  ]);
}

import { combineReducers } from "redux";
import accountReducer from "../../screens/account/reducer";
import addProfileReducer from "../../screens/addProfileData/reducer";
import allergiesReducer from "../../screens/allergies/reducer";
import askReducer from "../../screens/ask/reducer";
import askExpertReducer from "../../screens/ask/expert/reducer";
import authLoadingReducer from "../../screens/authLoading/reducer";
import basicInfoReducer from "../../screens/basicInfo/reducer";
import changePasswordReducer from "../../screens/changePassword/reducer";
import chat from "../../screens/chat/reducer";
import chatExpertReducer from "../../screens/chat/expert/reducer";
import chooseExpertReducer from "../../screens/chooseExpert/reducer";
import expertProfileReducer from "../../screens/expertProfile/reducer";
import forgotPasswordReducer from "../../screens/forgotPassword/reducer";
import insuranceReducer from "../../screens/insurance/reducer";
import lifestyleReducer from "../../screens/lifestyle/reducer";
import loaderReducer from "../../components/customLoader/reducer";
import loginReducer from "../../screens/login/reducer";
import medicalHistoryReducer from "../../screens/medicalHistory/reducer";
import medicationReducer from "../../screens/medications/reducer";
import modalReducer from "../../components/customModal/reducer";
import paymentReducer from "../../screens/payment/reducer";
import pregnancyHistoryReducer from "../../screens/pregnancyHistory/reducer";
import settingExpertReducer from "../../screens/setting/expert/reducer";
import settingReducer from "../../screens/setting/reducer";
import signupReducer from "../../screens/signUp/reducer";
import toastReducer from "../../components/customToast/reducer";

export default combineReducers({
  accountReducer,
  addProfileReducer,
  allergiesReducer,
  askReducer,
  askExpertReducer,
  authLoadingReducer,
  basicInfoReducer,
  changePasswordReducer,
  chat,
  chatExpertReducer,
  chooseExpertReducer,
  expertProfileReducer,
  forgotPasswordReducer,
  insuranceReducer,
  lifestyleReducer,
  loaderReducer,
  loginReducer,
  medicalHistoryReducer,
  medicationReducer,
  modalReducer,
  paymentReducer,
  pregnancyHistoryReducer,
  settingExpertReducer,
  settingReducer,
  signupReducer,
  toastReducer,
});

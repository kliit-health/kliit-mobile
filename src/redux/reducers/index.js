import { combineReducers } from 'redux';
import authLoadingReducer from '../../screens/authLoading/reducer';
import askReducer from '../../screens/ask/reducer';
import askExpertReducer from '../../screens/ask/expert/reducer';
import accountReducer from '../../screens/account/reducer';
import toastReducer from '../../components/customToast/reducer';
import loaderReducer from '../../components/customLoader/reducer';
import modalReducer from '../../components/customModal/reducer';
import loginReducer from '../../screens/login/reducer';
import forgotPasswordReducer from '../../screens/forgotPassword/reducer';
import signupReducer from '../../screens/signUp/reducer';
import addProfileReducer from '../../screens/addProfileData/reducer';
import chooseExpertReducer from '../../screens/chooseExpert/reducer';
import expertProfileReducer from '../../screens/expertProfile/reducer';
import settingReducer from '../../screens/setting/reducer';
import settingExpertReducer from '../../screens/setting/expert/reducer';
import changePasswordReducer from '../../screens/changePassword/reducer';
import chat from '../../screens/chat/reducer';
import chatExpertReducer from '../../screens/chat/expert/reducer';
import paymentReducer from '../../screens/payment/reducer';

export default combineReducers({
  authLoadingReducer,
  askReducer,
  askExpertReducer,
  accountReducer,
  toastReducer,
  loaderReducer,
  modalReducer,
  loginReducer,
  forgotPasswordReducer,
  signupReducer,
  addProfileReducer,
  chooseExpertReducer,
  expertProfileReducer,
  settingReducer,
  settingExpertReducer,
  changePasswordReducer,
  chat,
  chatExpertReducer,
  paymentReducer,
});

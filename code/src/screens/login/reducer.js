import { LOGIN_FIREBASE_API_HIT_FAILURE, RESET_LOGIN_STATE } from "../../redux/types";

const initialState = {
  loginFailure: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FIREBASE_API_HIT_FAILURE:
      return {
        ...state,
        loginFailure: true,
      };
    case RESET_LOGIN_STATE:
      return {
        ...state,
        loginFailure: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default loginReducer;

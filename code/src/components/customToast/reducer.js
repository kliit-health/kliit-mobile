import { SHOW_TOAST, HIDE_TOAST } from '../../redux/types';

const initialState = {
  showToast: false,
  textMessage: '',
  dispatch: null,
  delay: 2000,
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        showToast: true,
        textMessage: action.textMessage,
        dispatch: action.dispatch,
        delay: action.delay ? action.delay : 2000,
      };
    case HIDE_TOAST:
      return {
        ...state,
        showToast: false,
      };
    default:
      return { ...state };
  }
};

export default toastReducer;

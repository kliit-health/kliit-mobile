import { SHOW_API_LOADER, HIDE_API_LOADER } from '../../redux/types';

const initialState = {
  showLoader: false,
  textMessage: 'Loading...',
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_API_LOADER:
      return {
        ...state,
        showLoader: true,
        textMessage: action.data ? action.data : 'Loading...',
      };
    case HIDE_API_LOADER:
      return {
        ...state,
        showLoader: false,
        textMessage: '',
      };
    default:
      return { ...state };
  }
};

export default loaderReducer;

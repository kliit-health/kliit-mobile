import { GET_EXPERTS_DATA_SUCCESS, CLEAR_CHOOSE_EXPERT_STATE, GET_PROFESSIONS_DATA_SUCCESS, GET_LANGUAGES_DATA_SUCCESS } from "../../redux/types";

const initialState = {
  expertData: null,
  professionData: null,
  languagesData: null,
};
const chooseExpertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPERTS_DATA_SUCCESS:
      return {
        ...state,
        expertData: action.data,
      };

    case CLEAR_CHOOSE_EXPERT_STATE:
      return {
        ...state,
        expertData: null,
        professionData: null,
        languagesData: null,
      };

    case GET_PROFESSIONS_DATA_SUCCESS:
      return {
        ...state,
        professionData: action.data,
      };

    case GET_LANGUAGES_DATA_SUCCESS:
      return {
        ...state,
        languagesData: action.data,
      };

    default:
      return {
        ...state,
      };
  }
};

export default chooseExpertReducer;

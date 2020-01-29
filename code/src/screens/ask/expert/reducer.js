import * as types from '../../../redux/types'
const initialState = {
  resolvedQuestionsData: [],
  questionData: [],
  isDataFetch: false,
};
const askExpertReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EXPERT_QUESTION_SUCCESS:
      return {
        ...state,
        questionData: action.data,
        isDataFetch: true,
      }
    case types.GET_EXPERT_RESOLVED_QUESTION_SUCCESS:
      return {
        ...state,
        resolvedQuestionsData: action.data,
        isDataFetch: true,
      }
    default:
      return {
        ...state,
      };
  }
};
export default askExpertReducer;

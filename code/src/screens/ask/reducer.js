import {
  GET_RECENT_EXPERTS_DATA_SUCCESS,
  GET_PREVIOUS_QUESTION_DATA_SUCCESS,
  GET_QUESTION_DATA_SUCCESS,
  UPDATE_QUESTION,
  CLEAR_ASK_STATE,
  CLEAR_QUESTION_VALUE,
} from "../../redux/types";

const initialState = {
  recentExpertData: [],
  previousQuestionData: [],
  questionData: null,
  question: '',
};
const askReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECENT_EXPERTS_DATA_SUCCESS:
      return {
        ...state,
        recentExpertData: action.data,
      };
    case GET_QUESTION_DATA_SUCCESS:
      return {
        ...state,
        questionData: action.data,
      };
    case GET_PREVIOUS_QUESTION_DATA_SUCCESS:
      return {
        ...state,
        previousQuestionData: action.data,
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        question: action.data,
      };
    case CLEAR_ASK_STATE:
      return {
        ...state,
        recentExpertData: [],
        previousQuestionData: [],
        questionData: null,
        question: '',
      };
    case CLEAR_QUESTION_VALUE:
      return {
        ...state,
        question: '',
      };
    default:
      return {
        ...state,
      };
  }
};
export default askReducer;

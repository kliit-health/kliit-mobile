import {
    GET_RECENT_EXPERTS_DATA_SUCCESS,
    GET_QUESTION_DATA,
    GET_QUESTION_DATA_SUCCESS,
    GET_PREVIOUS_QUESTION_DATA_SUCCESS,
    UPDATE_QUESTION,
    CLEAR_ASK_STATE,
    CLEAR_QUESTION_VALUE,
    UPDATE_USER_DATA,
} from '../../redux/types';

export const getRecentExpertsDataSuccess = (data) => ({
    type: GET_RECENT_EXPERTS_DATA_SUCCESS,
    data,
});
export const updateUserDataWithNewKey=(id,data)=>({
    type: UPDATE_USER_DATA,
    id,
    data,
});
export const getQuestionData = (data, dispatch) => ({
    type: GET_QUESTION_DATA,
    data,
    dispatch,
});

export const getQuestionDataSuccess = (data) => ({
    type: GET_QUESTION_DATA_SUCCESS,
    data,
});

export const getPreviousQuestionDataSuccess = (data) => ({
    type: GET_PREVIOUS_QUESTION_DATA_SUCCESS,
    data,
});

export const updateQuestion = (data) => ({
    type: UPDATE_QUESTION,
    data,
});

export const clearAskState = () => ({
    type: CLEAR_ASK_STATE,
});

export const clearQuestionValue = () => ({
    type: CLEAR_QUESTION_VALUE,
});


import {
    GET_EXPERT_QUESTION_DATA,
    GET_EXPERT_QUESTION_SUCCESS,
    GET_EXPERT_RESOLVED_QUESTION_SUCCESS,
} from "../../../redux/types";

export const getExpertQuestionData = (data, dispatch) => ({
    type: GET_EXPERT_QUESTION_DATA,
    data,
    dispatch,
});

export const getExpertQuestionSuccess = (data) => ({
    type: GET_EXPERT_QUESTION_SUCCESS,
    data,
});

export const getExpertResolvedQuestionSuccess = (data) => ({
    type: GET_EXPERT_RESOLVED_QUESTION_SUCCESS,
    data,
});
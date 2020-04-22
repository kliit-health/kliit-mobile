import { GET_EXPERTS_DATA_SUCCESS, GET_EXPERTS_DATA, CLEAR_CHOOSE_EXPERT_STATE, GET_PROFESSIONS_DATA_SUCCESS, GET_LANGUAGES_DATA_SUCCESS } from "../../redux/types";

export const getExpertsDataSuccess = (data) => ({
    type: GET_EXPERTS_DATA_SUCCESS,
    data,
});

export const getExpertsData = (data, dispatch) => ({
    type: GET_EXPERTS_DATA,
    data,
    dispatch,
});

export const getProfessionsDataSuccess = (data) => ({
    type: GET_PROFESSIONS_DATA_SUCCESS,
    data,
});

export const getLanguagesDataSuccess = (data) => ({
    type: GET_LANGUAGES_DATA_SUCCESS,
    data,
});

export const clearChooseExpertState = () => ({
    type: CLEAR_CHOOSE_EXPERT_STATE,
});

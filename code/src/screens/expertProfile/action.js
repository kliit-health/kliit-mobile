import { GET_EXPERTS_DETAIL_DATA_SUCCESS, GET_EXPERTS_DETAIL_DATA, CLEAR_EXPERT_PROFILE_STATE } from "../../redux/types";

export const getExpertsData = (data) => ({
    type: GET_EXPERTS_DETAIL_DATA,
    data,
});

export const getExpertsDataSuccess = (data) => ({
    type: GET_EXPERTS_DETAIL_DATA_SUCCESS,
    data,
});

export const clearExpertProfileState = (data) => ({
    type: CLEAR_EXPERT_PROFILE_STATE,
    data,
});
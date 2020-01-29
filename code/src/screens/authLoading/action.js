import {
    SET_USER_DATA,
    SET_FCM_TOKEN,
    SET_APP_STATE,
    SET_APP_SCREEN,
} from "../../redux/types";

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    data,
})
export const setFcmToken = (data) => ({
    type: SET_FCM_TOKEN,
    data,
})
export const setAppState = (data) => ({
    type: SET_APP_STATE,
    data,
})
export const setAppScreen = (data) => ({
    type: SET_APP_SCREEN,
    data,
})
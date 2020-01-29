import * as types from '../../../redux/types'

export const loadExpertMessages = (data, dispatch) => ({
    type: types.CHAT_MESSAGE_EXPERT_LOADING,
    dispatch,
    data
})
export const loadExpertMessagesSuccess = messages => ({
    type: types.CHAT_LOAD_MESSAGES_EXPERT_SUCCESS,
    messages
})
export const loadExpertMessagesError = () => ({
    type: types.CHAT_LOAD_MESSAGES_EXPERT_ERROR
})
export const sendMessageExpert = (data) => ({
    type: types.CHAT_MESSAGE_EXPERT_SENDING,
    data,
});
export const chatMessageExpertSuccess = (data) => ({
    type: types.CHAT_MESSAGE_EXPERT_SUCCESS,
    data,
})
export const chatMessageExpertError = () => ({
    type: types.CHAT_MESSAGE_EXPERT_ERROR
})
export const clearChatExpertState = () => ({
    type: types.CLEAR_CHAT_EXPERT_STATE
})
export const setQuestionExpertData = (data) => ({
    type: types.SET_QUESTION_EXPERT_DATA,
    data,
})
export const checkUserStatus = (data, dispatch) => ({
    type: types.CHECK_USER_STATUS,
    data,
    dispatch,
})
export const checkUserStatusSuccess = (data) => ({
    type: types.CHECK_USER_STATUS_SUCCESS,
    data,
})
export const toggleExpertStatus = (data) => ({
    type: types.TOGGLE_EXPERT_STATUS,
    data,
})
export const checkQuestionExpertStatusSuccess = (data) => ({
    type: types.CHECK_QUESTION_EXPERT_STATUS_SUCCESS,
    data,
})
export const resolveQuestion = (data) => ({
    type: types.RESOLVE_QUESTION,
    data,
})
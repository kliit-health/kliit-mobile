import {
    CHAT_MESSAGE_SENDING,
    CHAT_MESSAGE_LOADING,
    CHAT_MESSAGE_UPDATE,
    CHAT_MESSAGE_SUCCESS,
    CHAT_MESSAGE_ERROR,
    CHAT_LOAD_MESSAGES_SUCCESS,
    CHAT_LOAD_MESSAGES_ERROR,
    CHAT_IMAGE_UPLOAD,
    SET_QUESTION,
    CLEAR_CHAT_STATE,
    SET_QUESTION_ID,
    SET_EXPERT_RATING,
    CHECK_EXPERT_STATUS,
    CHECK_EXPERT_STATUS_SUCCESS,
    TOGGLE_USER_STATUS,
    CHECK_QUESTION_STATUS_SUCCESS,
    STOP_OBSERVER_CHAT,
} from '../../redux/types';

export const setQuestion = (data, dispatch) => ({
    type: SET_QUESTION,
    data,
    dispatch,
});
export const sendMessage = (data) => ({
    type: CHAT_MESSAGE_SENDING,
    data,
});
export const updateImageInChatScreen = imageData => ({
    type: CHAT_IMAGE_UPLOAD,
    imageData
});
export const updateMessage = data => ({
    type: CHAT_MESSAGE_UPDATE,
    data
});
export const chatMessageSuccess = (data) => ({
    type: CHAT_MESSAGE_SUCCESS,
    data,
})
export const chatMessageError = () => ({
    type: CHAT_MESSAGE_ERROR
})
export const loadMessages = (data, dispatch) => ({
    type: CHAT_MESSAGE_LOADING,
    dispatch,
    data
})
export const loadMessagesSuccess = messages => ({
    type: CHAT_LOAD_MESSAGES_SUCCESS,
    messages
})
export const loadMessagesError = () => ({
    type: CHAT_LOAD_MESSAGES_ERROR
})
export const clearChatState = () => ({
    type: CLEAR_CHAT_STATE
})
export const setQuestionId = (data) => ({
    type: SET_QUESTION_ID,
    data,
})
export const setExpertRating = (data) => ({
    type: SET_EXPERT_RATING,
    data,
})
export const checkExpertStatus = (data, dispatch) => ({
    type: CHECK_EXPERT_STATUS,
    data,
    dispatch,
})
export const checkExpertStatusSuccess = (data) => ({
    type: CHECK_EXPERT_STATUS_SUCCESS,
    data,
})
export const toggleUserStatus = (data) => ({
    type: TOGGLE_USER_STATUS,
    data,
})
export const checkQuestionStatusSuccess = (data) => ({
    type: CHECK_QUESTION_STATUS_SUCCESS,
    data,
})
export const stopObserverChat = () => ({
    type: STOP_OBSERVER_CHAT,
})




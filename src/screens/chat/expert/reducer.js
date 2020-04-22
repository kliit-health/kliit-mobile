import * as types from '../../../redux/types'
import Constant from '../../../utils/constants'

const initialState = {
    sending: false,
    sendingError: null,
    message: '',
    messages: [],
    loadMessagesError: null,
    imageUrl: '',
    messageId: '',
    questionId: '',
    questionData: '',
    userStatusData: null,
}

const chatExpertReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHAT_MESSAGE_EXPERT_LOADING:
            return {
                ...state,
                sending: true,
                sendingError: null,
            }
        case types.CHAT_MESSAGE_EXPERT_ERROR:
            return {
                ...state,
                sending: false,
                sendingError: action.error,
            }
        case types.CHAT_MESSAGE_EXPERT_SUCCESS:
            return {
                ...state,
                sending: false,
                sendingError: null,
                message: '',
                questionData: action.data.questionData,
            }
        case types.CHAT_LOAD_MESSAGES_EXPERT_SUCCESS:
            return {
                ...state,
                sending: false,
                // messages: action.messages.length > state.messages.length ?
                //         [...state.messages, action.messages[action.messages.length - 1]] :
                //         action.messages,
                messages: action.messages,
                loadMessagesError: null,
            }
        case types.CHAT_LOAD_MESSAGES_EXPERT_ERROR:
            return {
                ...state,
                sending: false,
                messages: null,
                loadMessagesError: action.error,
            }
        case types.CHAT_IMAGE_EXPERT_UPLOAD:
            return {
                ...state,
                sending: false,
                sendingError: null,
                imageUrl: action.imageData,
            }
        case types.CLEAR_CHAT_EXPERT_STATE:
            return {
                ...state,
                sending: false,
                sendingError: null,
                message: '',
                messages: [],
                loadMessagesError: null,
                imageUrl: '',
                questionId: '',
                questionData: '',
                userStatusData: null,
            }
        case types.SET_QUESTION_EXPERT_DATA:
            return {
                ...state,
                messageId: action.data.messageId,
                questionId: action.data.questionId,
                questionData: action.data.questionData,
            }
        case types.CHECK_USER_STATUS_SUCCESS:
            return {
                ...state,
                userStatusData: action.data,
            }
        case types.CHECK_QUESTION_EXPERT_STATUS_SUCCESS:
            return {
                ...state,
                questionData: action.data,
            }
        default:
            return state
    }
}

export default chatExpertReducer

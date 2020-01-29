import * as types from '../../redux/types'
import Constant from '../../utils/constants'

const initialState = {
    sending: false,
    sendingError: null,
    message: '',
    // messages: [{
    //     text: Constant.App.disclaimerTextForChat,
    //     image: '',
    // }],
    messages: [],
    loadMessagesError: null,
    imageUrl: '',
    messageId: '',
    questionId: '',
    questionData: null,
    expertStatusData: null,
}

const chat = (state = initialState, action) => {
    switch (action.type) {
        case types.CHAT_MESSAGE_LOADING:
            return {
                ...state,
                sending: true,
                sendingError: null,
            }
        case types.CHAT_MESSAGE_ERROR:
            return {
                ...state,
                sending: false,
                sendingError: action.error,
            }
        case types.CHAT_MESSAGE_SUCCESS:
            return {
                ...state,
                sending: false,
                sendingError: null,
                message: '',
                questionData: action.data.questionData,
            }
        case types.CHAT_LOAD_MESSAGES_SUCCESS:
            return {
                ...state,
                sending: false,
                // messages: state.messages.length == 1 ?
                //     [...state.messages, ...action.messages] :
                //     action.messages.length > state.messages.length - 1 ?
                //         [...state.messages, action.messages[action.messages.length - 1]] :
                //         [...state.messages, ...action.messages],
                messages: action.messages,
                loadMessagesError: null,
            }
        case types.CHAT_LOAD_MESSAGES_ERROR:
            return {
                ...state,
                sending: false,
                messages: null,
                loadMessagesError: action.error,
            }
        case types.CHAT_IMAGE_UPLOAD:
            return {
                ...state,
                sending: false,
                sendingError: null,
                imageUrl: action.imageData,
            }
        case types.CLEAR_CHAT_STATE:
            return {
                ...state,
                sending: false,
                sendingError: null,
                message: '',
                messages: [],
                loadMessagesError: null,
                imageUrl: '',
                questionId: '',
                questionData: null,
                expertStatusData: null,
            }
        case types.SET_QUESTION_ID:
            return {
                ...state,
                messageId: action.data.messageId,
                questionId: action.data.questionId,
                questionData: action.data.questionData,
            }
        case types.CHECK_EXPERT_STATUS_SUCCESS:
            return {
                ...state,
                expertStatusData: action.data,
            }
        case types.CHECK_QUESTION_STATUS_SUCCESS:
            return {
                ...state,
                questionData: action.data,
            }
        default:
            return state
    }
}

export default chat

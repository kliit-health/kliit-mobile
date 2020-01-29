import { put, takeEvery, select } from 'redux-saga/effects';
import {
    CHAT_MESSAGE_SENDING,
    CHAT_MESSAGE_LOADING,
    SET_QUESTION,
    SET_EXPERT_RATING,
    CHECK_EXPERT_STATUS,
    TOGGLE_USER_STATUS,
    STOP_OBSERVER_CHAT,
} from '../../redux/types';
import Language from '../../utils/localization';
import {
    sendMessage,
    loadMessages,
    sendEncryptedKeyToFirebase,
    uploadImage,
    saveQuestion,
    resolvedQuestion,
    addUserData,
    checkStatus,
    updateStatus,
    updateReadMessageStatus,
    updateUnreadCount,
    checkQuestionStatus,
} from '../../utils/firebase';
import {
    chatMessageSuccess,
    chatMessageError,
    loadMessagesSuccess,
    loadMessagesError,
    setQuestionId,
    checkExpertStatusSuccess,
    checkQuestionStatusSuccess,
} from './action';
import { showOrHideModal } from '../../components/customModal/action';
import { displayConsole } from '../../utils/helper';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import Constant from '../../utils/constants';
import { clearQuestionValue } from '../ask/action';
import moment from 'moment';
// var RSAKey = require('react-native-rsa');
// var rsa = new RSAKey();
let Lang = Language['en'], loadMessagesObserver, checkStatusObserver, checkQuestionStatusObserver;
const delay = ms => new Promise(res => setTimeout(res, ms));
let delayTime = 100;
function* setQuestion({ data, dispatch }) {
    try {
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        const state = yield select();
        const userData = state.authLoadingReducer.userData;
        const { userInfo, expertInfo, question, questionEncrypted } = data;
        const setQuestionParams = {
            question,
            isResolved: false,
            modifiedDate: '',
            resolvedDate: '',
            createdAt: moment().unix(),
            resolvedDate: '',
            expertInfo,
            userInfo,
            expertUnreadCount: 1,
            userUnreadCount: 0,
            lastMessage: question,
            isRated: false,
        }
        const responseSaveQuestion = yield saveQuestion(setQuestionParams)
        if (responseSaveQuestion.success) {
            const questionData = {
                question,
                isResolved: false,
                createdAt: moment().unix(),
                modifiedDate: '',
                resolvedDate: '',
                expertInfo,
                userInfo,
                messageId: responseSaveQuestion.data.messageId,
                questionId: responseSaveQuestion.data.questionId,
                expertUnreadCount: 1,
                userUnreadCount: 0,
                lastMessage: question,
                isRated: false,
            }
            yield put(setQuestionId({
                messageId: responseSaveQuestion.data.messageId,
                questionId: responseSaveQuestion.data.questionId,
                questionData,
            }));
            const paramsUpdateCredits = {
                uid: userData.uid,
                updatedData: {
                    credits: userData.credits - Constant.App.questionCreditValue
                }
            }
            yield updateStatus(paramsUpdateCredits);
            yield delay(delayTime);
            yield checkQuestStatus({ data: { questionData }, dispatch });
            const sendMessageParams = {
                id: responseSaveQuestion.data.messageId,
                messageParams: {
                    // text: questionEncrypted,
                    text: question,
                    type: 'User',
                    createdAt: moment().unix(),
                    questionId: '',
                    isRead: false,
                    image: '',
                },
                lastMessage: question,
                questionId: responseSaveQuestion.data.questionId,
                unreadCount: {
                    expertUnreadCount: 1
                },
            }
            yield delay(delayTime);
            yield sendMessage(sendMessageParams);
            yield put(clearQuestionValue());
            const payloadData = {
                data: {
                    id: responseSaveQuestion.data.messageId,
                },
                dispatch,
            }
            yield delay(delayTime);
            yield loadMessagesOfUser(payloadData);
        } else {
            yield delay(500);
            yield put(hideApiLoader());
            yield put(showOrHideModal(
                responseSaveQuestion.message ? responseSaveQuestion.message
                    : Lang.errorMessage.serverError,
            ));
        }
    } catch (error) {
        yield put(hideApiLoader());
        yield put(showOrHideModal(Lang.errorMessage.serverError));
    }
}

function* sendMessageToUser({ data }) {
    try {
        const { messageParams, imageParams, id, lastMessage, questionId } = data;
        displayConsole('sendMessageToUser call data', data);
        if (imageParams) {
            yield put(showApiLoader(Lang.apiLoader.loadingText));
            yield delay(delayTime);
            const responseImage = yield uploadImage(imageParams)
            if (responseImage.success) {
                const { downloadURL } = responseImage.data;
                messageParams.image = downloadURL;
                const state = yield select();
                const expertStatusData = state.chat.expertStatusData;
                const userData = state.authLoadingReducer.userData;
                const questionData = Object.assign({}, state.chat.questionData);
                displayConsole('questionData', questionData);
                var unreadCount = questionData.unreadCount ? questionData.unreadCount : 0;
                displayConsole('unreadCount', unreadCount);
                if (expertStatusData && expertStatusData.isActive && expertStatusData.toUserId === userData.uid) {
                    messageParams.isRead = true;
                    unreadCount = 0;
                } else {
                    unreadCount = unreadCount + 1;
                }
                const params = {
                    id,
                    messageParams,
                    lastMessage,
                    questionId,
                    unreadCount: {
                        expertUnreadCount: unreadCount
                    },
                }
                yield put(hideApiLoader());
                yield sendMessage(params);
                questionData.expertUnreadCount = unreadCount;
                const dataResponse = {
                    questionData,
                }
                displayConsole('dataResponse', dataResponse);
                yield put(chatMessageSuccess(dataResponse));
            } else {
                yield put(showOrHideModal(
                    responseImage.message ? responseImage.message
                        : Lang.errorMessage.serverError,
                ));
            }
        } else {
            const state = yield select();
            const expertStatusData = state.chat.expertStatusData;
            const userData = state.authLoadingReducer.userData;
            const questionData = Object.assign({}, state.chat.questionData);
            var unreadCount = questionData.expertUnreadCount ? questionData.expertUnreadCount : 0;
            if (expertStatusData && expertStatusData.isActive && expertStatusData.toUserId === userData.uid) {
                messageParams.isRead = true;
                unreadCount = 0;
            } else {
                unreadCount = unreadCount + 1;
            }
            const params = {
                id,
                messageParams,
                lastMessage,
                questionId,
                unreadCount: {
                    expertUnreadCount: unreadCount
                },
            }
            yield sendMessage(params);
            questionData.expertUnreadCount = unreadCount;
            const dataResponse = {
                questionData,
            }
            displayConsole('dataResponse', dataResponse);
            yield put(chatMessageSuccess(dataResponse));
        }
    } catch (error) {
        yield put(hideApiLoader());
        yield put(chatMessageError());
    }
}
function* loadMessagesOfUser({ data, dispatch }) {
    try {
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        let isFirstTime = true;
        loadMessagesObserver = yield loadMessages(data, querySnapshot => {
            displayConsole('inside loadMessagesOfUser message', querySnapshot.docs);
            const response = {
                success: true,
                messages: querySnapshot.docs,
            }
            dispatch(loadMessagesSuccess(response.messages));
            if (isFirstTime) {
                const obj = {
                    id: data.id,
                    key: 'type',
                    value: 'Expert',
                }
                dispatch(hideApiLoader());
                updateReadMessageStatus(obj);
                isFirstTime = false;
            }
            displayConsole('data loadMessagesOfUser', data);
            displayConsole('--------------**** loadMessagesOfUser end ********-----------\n\n');
        }, error => {
            const { message, code } = error;
            displayConsole("message loadMessagesOfUser", message);
            displayConsole("code loadMessagesOfUser", code);
            const data = {
                success: false,
                message: message,
            };
            dispatch(hideApiLoader());
            dispatch(loadMessagesError(data.message));
            displayConsole('data loadMessagesOfUser', data);
            displayConsole('--------------**** loadMessagesOfUser end ********-----------\n\n');
        });
    } catch (error) {
        displayConsole('loadMessagesOfUser  error ', error);
        yield put(hideApiLoader());
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }

}

function* setExpertRating({ data }) {
    try {
        displayConsole('data', data);
        const { resolveQuestionParams, setExpertRatingParams, navigation } = data;
        const responseResolvedQuestion = yield resolvedQuestion(resolveQuestionParams)
        if (responseResolvedQuestion.success) {
            const responseAddUserData = yield addUserData(setExpertRatingParams);
            if (responseAddUserData.success) {
                navigation.navigate(Constant.App.screenNames.BottomTab);
            } else {
                yield put(showOrHideModal(
                    responseAddUserData.message ? responseAddUserData.message
                        : Lang.errorMessage.serverError,
                ));
            }
        } else {
            yield put(showOrHideModal(
                responseResolvedQuestion.message ? responseResolvedQuestion.message
                    : Lang.errorMessage.serverError,
            ));
        }
    } catch (error) {
        displayConsole('setExpertRating  error ', error);
        yield put(hideApiLoader());
        yield put(showOrHideModal(Lang.errorMessage.serverError));
    }
}


function* checkExpertStatus({ data, dispatch }) {
    try {
        displayConsole('data', data);
        const { expertInfo, questionData } = data;
        checkStatusObserver = yield checkStatus({
            id: expertInfo.uid
        }, querySnapshot => {
            displayConsole('inside checkExpertStatus', querySnapshot.data());
            dispatch(checkExpertStatusSuccess(querySnapshot.data()));
            displayConsole('--------------**** checkExpertStatus end ********-----------\n\n');
        }, error => {
            const { message, code } = error;
            displayConsole("message", message);
            displayConsole("code", code);
            const data = {
                success: false,
                message: message,
            };
            dispatch(loadMessagesError(data.message));
            displayConsole('data', data);
            displayConsole('--------------**** checkExpertStatus end ********-----------\n\n');
        });
        if (questionData) {
            yield delay(delayTime);
            yield checkQuestStatus({ data: { questionData }, dispatch });
        }
    } catch (error) {
        displayConsole('checkExpertStatus  error ', error);
        yield put(showOrHideModal(Lang.errorMessage.serverError));
    }
}

function* checkQuestStatus({ data, dispatch }) {
    try {
        displayConsole('data', data);
        const { questionData } = data;
        checkQuestionStatusObserver = yield checkQuestionStatus({
            id: questionData.questionId
        }, querySnapshot => {
            displayConsole('inside checkQuestStatus', querySnapshot.data());
            dispatch(checkQuestionStatusSuccess(querySnapshot.data()));
            displayConsole('--------------**** checkQuestStatus end ********-----------\n\n');
        }, error => {
            const { message, code } = error;
            displayConsole("message", message);
            displayConsole("code", code);
            const data = {
                success: false,
                message: message,
            };
            displayConsole('data', data);
            displayConsole('--------------**** checkQuestStatus end ********-----------\n\n');
        });
    } catch (error) {
        displayConsole('checkQuestStatus  error ', error);
        yield put(showOrHideModal(Lang.errorMessage.serverError));
    }
}

function* toggleUserStatus({ data }) {
    try {
        const { toggleStatusParams, questionData } = data;
        yield updateStatus(toggleStatusParams);
        if (questionData) {
            const params = {
                questionData,
                updateData: {
                    userUnreadCount: 0
                }
            }
            yield delay(delayTime);
            yield updateUnreadCount(params);
        }
    } catch (error) {
        displayConsole('toggleUserStatus  error ', error);
    }
}

function* stopOberver() {
    try {
        if (checkQuestionStatusObserver) {
            checkQuestionStatusObserver();
        }
        if (checkStatusObserver) {
            checkStatusObserver();
        }
        if (loadMessagesObserver) {
            loadMessagesObserver();
        }
    } catch (error) {
        displayConsole('stopOberver  error ', error);
    }
}


export default function* chatSaga() {
    yield takeEvery(CHAT_MESSAGE_SENDING, sendMessageToUser);
    yield takeEvery(CHAT_MESSAGE_LOADING, loadMessagesOfUser);
    yield takeEvery(SET_EXPERT_RATING, setExpertRating);
    yield takeEvery(SET_QUESTION, setQuestion);
    yield takeEvery(CHECK_EXPERT_STATUS, checkExpertStatus);
    yield takeEvery(TOGGLE_USER_STATUS, toggleUserStatus);
    yield takeEvery(STOP_OBSERVER_CHAT, stopOberver);
}

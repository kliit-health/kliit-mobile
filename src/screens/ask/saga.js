import { put, takeEvery, select } from 'redux-saga/effects';
import Language from '../../utils/localization';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import { getRecentExpertsData, getQuestionsData, updateRefrealcodeForAllUsers } from '../../utils/firebase';
import { showOrHideModal } from '../../components/customModal/action';
import { getRecentExpertsDataSuccess, getQuestionDataSuccess, getPreviousQuestionDataSuccess } from './action';
import { GET_QUESTION_DATA, UPDATE_USER_DATA } from '../../redux/types';
import { displayConsole } from '../../utils/helper';

let Lang = Language['en'];
const delay = ms => new Promise(res => setTimeout(res, ms));
let delayTime = 100;

function* updateNewKeyToUserTable({ id, data }) {
    console.log('updateNewKeyToUserTable*******', id);
    yield updateRefrealcodeForAllUsers(id, data)
}
function* getQuestions({ data, dispatch }) {
    try {
        const { expertsParams, questionParams, previousQuestionParams, } = data;
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        yield getQuestionsData(questionParams, querySnapshot => {
            displayConsole('inside getQuestionsData', querySnapshot.docs);
            dispatch(getQuestionDataSuccess(querySnapshot.docs && querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data() : null));
            displayConsole('--------------**** getQuestionsData end ********-----------\n\n');
        }, error => {
            const { message, code } = error;
            displayConsole("message getQuestionsData", message);
            displayConsole("code getQuestionsData", code);
            if (code && code !== 'firestore/permission-denied') {
                dispatch(hideApiLoader());
                dispatch(showOrHideModal(
                    message ? message
                        : Lang.errorMessage.serverError,
                ));
            }
            displayConsole('--------------**** getQuestionsData end ********-----------\n\n');
        });

        if (expertsParams && previousQuestionParams) {
            yield delay(delayTime);
            yield getRecentExperts(expertsParams, previousQuestionParams, dispatch);
        }
    } catch (error) {
        yield put(hideApiLoader());
        yield delay(500);
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }
}

function* getRecentExperts(expertsParams, previousQuestionParams, dispatch) {
    try {
        // const response = yield getCollectionDataWithCondition(expertsParams);

        yield getRecentExpertsData(expertsParams, querySnapshot => {
            displayConsole('inside getRecentExpertsData', querySnapshot.docs);
            dispatch(getRecentExpertsDataSuccess(querySnapshot.docs && querySnapshot.docs.length > 0 ? querySnapshot.docs : []));
            displayConsole('--------------**** getRecentExpertsData end ********-----------\n\n');
        }, error => {
            const { message, code } = error;
            displayConsole("message getRecentExpertsData", message);
            displayConsole("code getRecentExpertsData", code);
            if (code && code !== 'firestore/permission-denied') {
                dispatch(hideApiLoader());
                dispatch(showOrHideModal(
                    message ? message
                        : Lang.errorMessage.serverError,
                ));
            }
            displayConsole('--------------**** getRecentExpertsData end ********-----------\n\n');
        });

        if (previousQuestionParams) {
            yield delay(delayTime);
            yield getPreviousQuestions(previousQuestionParams, dispatch);
        }

        // if (response && response.success) {
        //     yield put(getRecentExpertsDataSuccess(response.data && response.data.length > 0 ? response.data : []));
        //     yield getPreviousQuestions(previousQuestionParams, dispatch);
        // } else {
        //     yield put(hideApiLoader("getRecentExperts"));
        //     yield put(showOrHideModal(
        //         response.message ? response.message
        //             : Lang.errorMessage.serverError,
        //     ));
        // }
    } catch (error) {
        yield put(hideApiLoader());
        yield delay(500);
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }
}

function* getPreviousQuestions(previousQuestionParams, dispatch) {
    try {
        yield getQuestionsData(previousQuestionParams, querySnapshot => {
            displayConsole('inside getPreviousQuestions', querySnapshot.docs);
            dispatch(getPreviousQuestionDataSuccess(querySnapshot.docs));
            dispatch(hideApiLoader());
            displayConsole('--------------**** getPreviousQuestions end ********-----------\n\n');
        }, error => {
            const { message, code } = error;
            displayConsole("message getPreviousQuestions", message);
            displayConsole("code getPreviousQuestions", code);
            dispatch(hideApiLoader());
            if (code && code !== 'firestore/permission-denied') {
                dispatch(showOrHideModal(
                    message ? message
                        : Lang.errorMessage.serverError,
                ));
            }
            displayConsole('--------------**** getPreviousQuestions end ********-----------\n\n');
        });
    } catch (error) {
        yield put(hideApiLoader());
        yield delay(500);
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }
}
export default function* askSaga() {
    yield takeEvery(GET_QUESTION_DATA, getQuestions);
    yield takeEvery(UPDATE_USER_DATA, updateNewKeyToUserTable)
}
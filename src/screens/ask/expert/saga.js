
import { put, takeEvery } from 'redux-saga/effects';
import Language from '../../../utils/localization';
import { showApiLoader, hideApiLoader } from '../../../components/customLoader/action';
import {
    getQuestionsData,
    getExpertQuestionsData,
} from '../../../utils/firebase';
import { showOrHideModal } from '../../../components/customModal/action';
import { GET_EXPERT_QUESTION_DATA } from '../../../redux/types';
import { displayConsole } from '../../../utils/helper';
import { getExpertQuestionDataSuccess, getExpertQuestionSuccess, getExpertResolvedQuestionSuccess } from './action';

let Lang = Language['en'];
const delay = ms => new Promise(res => setTimeout(res, ms));
let delayTime = 100;
function* getExpertQuestions({ data, dispatch }) {
    try {
        const { questionParams, previousQuestionParams } = data;
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        yield delay(delayTime);
        yield getExpertQuestionsData(questionParams, querySnapshot => {
            let questionsData = [];
            querySnapshot
                .docs
                .forEach(doc => {
                    questionsData.push(doc.data());
                });
            dispatch(hideApiLoader());
            dispatch(getExpertQuestionSuccess(questionsData));
            displayConsole('questionsData', questionsData)
            displayConsole('--------------**** getExpertQuestionsData end ********-----------\n\n');
        }, error => {
            const { message, code } = error;
            displayConsole("message", message);
            displayConsole("code", code);
            const data = {
                success: false,
                message: message,
            };
            displayConsole('data', data);
            displayConsole('--------------**** getExpertQuestionsData end ********-----------\n\n');
        });
        yield delay(delayTime);
        yield getExpertQuestionsData(previousQuestionParams, querySnapshot => {
            let prevQuestionsData = [];
            querySnapshot
                .docs
                .forEach(doc => {
                    prevQuestionsData.push(doc.data());
                });
            dispatch(getExpertResolvedQuestionSuccess(prevQuestionsData));
            dispatch(hideApiLoader());
            displayConsole('prevQuestionsData', prevQuestionsData)
            displayConsole('--------------**** getExpertPrevQuestionsData end ********-----------\n\n');
        }, error => {
            const { message, code } = error;
            displayConsole("message", message);
            displayConsole("code", code);
            const data = {
                success: false,
                message: message,
            };
            displayConsole('data', data);
            displayConsole('--------------**** getExpertPrevQuestionsData end ********-----------\n\n');
        });
    } catch (error) {
        yield delay(500);
        yield put(hideApiLoader());
        yield delay(500);
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }
}

export default function* askExpertSaga() {
    yield takeEvery(GET_EXPERT_QUESTION_DATA, getExpertQuestions);
}

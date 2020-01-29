import { put, takeEvery } from 'redux-saga/effects';
import Language from '../../utils/localization';
import { showApiLoader, hideApiLoader } from '../../components/customLoader/action';
import { getCollectionDataWithCondition, getCollectionData, getFilterDataWithCondition, getExpertsData } from '../../utils/firebase';
import { showOrHideModal } from '../../components/customModal/action';
import { getExpertsDataSuccess, getProfessionsDataSuccess, getLanguagesDataSuccess } from './action';
import { GET_EXPERTS_DATA } from '../../redux/types';
import Constant from '../../utils/constants';
import { displayConsole } from '../../utils/helper';

let Lang = Language['en'];
const delay = ms => new Promise(res => setTimeout(res, ms));
var refExpertData;
function* getExperts(data, dispatch) {
    try {
        const { expertsParams, filterParams, isProfessionLangaugesDataLoaded } = data;
        console.log('data ', data);
        console.log('dispatch ', dispatch);
        console.log('isProfessionLangaugesDataLoaded ', isProfessionLangaugesDataLoaded);
        // var response;
        // if (expertsParams) {
        //     response = yield getCollectionDataWithCondition(expertsParams);
        // } else {
        //     response = yield getFilterDataWithCondition(filterParams);
        // }
        // yield delay(500);
        // yield put(hideApiLoader());
        // yield delay(500);
        // if (response && response.success) {
        //     yield put(getExpertsDataSuccess(response.data && response.data.length > 0 ? response.data : []));
        // } else {
        //     yield put(showOrHideModal(
        //         responseImage.message ? responseImage.message
        //             : Lang.errorMessage.serverError,
        //     ));
        // }

        if (refExpertData) {
            refExpertData();
        }
        refExpertData = yield getExpertsData(expertsParams ? expertsParams : filterParams, querySnapshot => {
            displayConsole('inside getExpertsData', querySnapshot.docs);
            if (expertsParams) {
                dispatch(getExpertsDataSuccess(querySnapshot.docs && querySnapshot.docs.length > 0 ? querySnapshot.docs : []));
            } else {
                var arr = [];
                querySnapshot.docs.forEach(element => {
                    if (filterParams.professions && filterParams.professions.length > 0 && filterParams.languages && filterParams.languages.length > 0) {
                        let isLanguagesMatch = false;
                        let isProfessionMatch = false;

                        filterParams.professions.forEach(profession => {
                            if (element.data().profileInfo.profession.fullName == profession) {
                                isProfessionMatch = true;
                            }
                        });
                        filterParams.languages.forEach(language => {
                            element.data().profileInfo.languages.forEach(elementLanguage => {
                                if (elementLanguage.code == language.code) {
                                    isLanguagesMatch = true;
                                }
                            });
                        });
                        if (isLanguagesMatch && isProfessionMatch) {
                            arr.push(element);
                        }
                    } else if (filterParams.professions && filterParams.professions.length > 0) {
                        filterParams.professions.forEach(profession => {
                            if (element.data().profileInfo.profession.fullName == profession) {
                                arr.push(element);
                            }
                        });
                    } else if (filterParams.languages && filterParams.languages.length > 0) {
                        filterParams.languages.forEach(language => {
                            element.data().profileInfo.languages.forEach(elementLanguage => {
                                if (elementLanguage.code == language.code) {
                                    arr.push(element);
                                }
                            });
                        });
                    } else {
                        arr.push(element);
                    }
                });
                dispatch(getExpertsDataSuccess(arr && arr.length > 0 ? arr : []));
            }
            displayConsole('--------------**** getExpertsData end ********-----------\n\n');
            delay(1500);
            dispatch(hideApiLoader());
        }, error => {
            const { message, code } = error;
            displayConsole("message getExpertsData", message);
            displayConsole("code getExpertsData", code);
            if (code && code !== 'firestore/permission-denied') {
                if (!isProfessionLangaugesDataLoaded) {
                    dispatch(hideApiLoader());
                }
                dispatch(showOrHideModal(
                    message ? message
                        : Lang.errorMessage.serverError,
                ));
            }
            displayConsole('--------------**** getExpertsData end ********-----------\n\n');
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

function* getProfessions({ data, dispatch }) {
    try {
        const { expertsParams, isProfessionLangaugesDataLoaded } = data;
        yield put(showApiLoader(Lang.apiLoader.loadingText));
        yield delay(500);
        if (expertsParams && !isProfessionLangaugesDataLoaded) {
            const params = {
                tableName: Constant.App.firebaseTableNames.professions,
            }
            const response = yield getCollectionData(params);
            if (response && response.success) {
                yield put(getProfessionsDataSuccess(response.data && response.data.length > 0 ? response.data : []));
            }
            yield getLanguages(data, dispatch);
        } else {
            yield getExperts(data, dispatch);
        }

    } catch (error) {
        yield put(hideApiLoader());
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }
}

function* getLanguages(data, dispatch) {
    try {
        const params = {
            tableName: Constant.App.firebaseTableNames.languages,
        }
        const response = yield getCollectionData(params);
        yield getExperts(data, dispatch)
        if (response && response.success) {
            yield put(getLanguagesDataSuccess(response.data && response.data.length > 0 ? response.data : []));
        }
    } catch (error) {
        yield delay(500);
        yield put(hideApiLoader());
        yield delay(500);
        yield put(
            showOrHideModal(Lang.errorMessage.serverError),
        );
    }
}

export default function* chooseExpertSaga() {
    yield takeEvery(GET_EXPERTS_DATA, getProfessions);
}
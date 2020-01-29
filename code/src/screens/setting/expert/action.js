import { UPDATE_EXPERT_DETAIL_DATA } from '../../../redux/types';

export const updateExpertDataToFirebase = (data) => ({
    type: UPDATE_EXPERT_DETAIL_DATA,
    data,
});

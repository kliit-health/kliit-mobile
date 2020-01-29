import { UPDATE_USER_DETAIL_DATA } from '../../redux/types';

export const updateUserDataToFirebase = (data) => ({
    type: UPDATE_USER_DETAIL_DATA,
    data,
});

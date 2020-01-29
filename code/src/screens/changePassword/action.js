import { CHANGE_PASSWORD } from '../../redux/types';

export const changePassword = (data) => ({
    type: CHANGE_PASSWORD,
    data,
});

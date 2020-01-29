import { SIGN_OUT_API_HIT } from '../../redux/types';

export const signoutApihit = (data) => ({
    type: SIGN_OUT_API_HIT,
    data,
});

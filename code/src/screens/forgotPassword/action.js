import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, RESET_FORGOT_PASSWORD_STATE } from '../../redux/types';

export const forgotPasswordApiHit = (data) => ({
  type: FORGOT_PASSWORD,
  data,
});

export const forgotPasswordApiHitSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const resertForgotPasswordState = () => ({
  type: RESET_FORGOT_PASSWORD_STATE,
});


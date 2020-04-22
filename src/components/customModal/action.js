import {
  SHOW_OR_HIDE_ERROR_MODAL,
  SHOW_OR_HIDE_DEDUCT_CONFIRMATION_MODAL,
} from '../../redux/types';

export const showOrHideModal = errorMessage => ({
  type: SHOW_OR_HIDE_ERROR_MODAL,
  errorMessage,
});

export const showOrHideDeductConfirmationModal = (data, arr, totalAmount) => ({
  type: SHOW_OR_HIDE_DEDUCT_CONFIRMATION_MODAL,
  data,
  arr,
  totalAmount,
});

import { SHOW_TOAST, HIDE_TOAST } from '../../redux/types';

export const showToast = (textMessage, delay, dispatch) => ({
  type: SHOW_TOAST,
  textMessage,
  delay,
  dispatch,
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});

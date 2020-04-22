import { UPLOAD_USER_DETAIL_DATA } from '../../redux/types';

export const uploadUserDataToFirebase = (data, dispatch) => ({
  type: UPLOAD_USER_DETAIL_DATA,
  data,
  dispatch,
});

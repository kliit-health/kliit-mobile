import { CREATE_USER } from '../../redux/types';

export const createUser = (data, dispatch) => ({
  type: CREATE_USER,
  data,
  dispatch,
});

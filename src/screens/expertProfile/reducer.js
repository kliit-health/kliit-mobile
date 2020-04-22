import { GET_EXPERTS_DETAIL_DATA_SUCCESS, CLEAR_EXPERT_PROFILE_STATE } from "../../redux/types";

const initialState = {
  expertData: null,
};
const expertProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPERTS_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        expertData: action.data,
      };
    case CLEAR_EXPERT_PROFILE_STATE:
      return {
        ...state,
        expertData: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default expertProfileReducer;

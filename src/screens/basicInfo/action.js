import { UPDATE_BASIC_INFO } from "../../redux/types";

export const updateBasicInfo = (data) => ({
  type: UPDATE_BASIC_INFO,
  data,
});

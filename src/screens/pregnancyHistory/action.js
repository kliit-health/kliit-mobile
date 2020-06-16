import { UPDATE_PREGNANCY_HISTORY } from "../../redux/types";

export const updatePregnancyHistory = (data) => ({
  type: UPDATE_PREGNANCY_HISTORY,
  data,
});

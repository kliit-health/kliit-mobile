import { UPDATE_MEDICAL_HISTORY } from "../../redux/types";

export const updateMedicalHistory = (data) => ({
  type: UPDATE_MEDICAL_HISTORY,
  data,
});

import { UPDATE_MEDICATIONS } from "../../redux/types";

export const updateMedications = (data) => ({
  type: UPDATE_MEDICATIONS,
  data,
});

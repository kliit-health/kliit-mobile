import { UPDATE_ALLERGIES } from "../../redux/types";

export const updateAllergies = (data) => ({
  type: UPDATE_ALLERGIES,
  data,
});

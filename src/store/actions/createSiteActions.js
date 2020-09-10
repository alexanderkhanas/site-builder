import { fetchDirections, fetchTemplates } from "../api/api";
import { getToken } from "../../utils/utils";
import { SET_DIRECTIONS, SET_TEMPLATES } from "./actionTypes";

export const getDirectionsAction = () => {
  return async (dispatch) => {
    const response = await fetchDirections(getToken());
    console.log("directions response ===", response?.data);
    if (response?.status === 200) {
      const { directions } = response.data;
      dispatch({ type: SET_DIRECTIONS, directions });
    }
    return response?.status === 200;
  };
};

export const getTemplatesAction = (directionId) => {
  return async (dispatch) => {
    const response = await fetchTemplates(directionId, getToken());
    console.log("directions response ===", response?.data);
    if (response?.status === 200) {
      const { templates } = response.data;
      dispatch({ type: SET_TEMPLATES, templates, directionId });
    }
    return response?.status === 200;
  };
};

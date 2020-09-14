import {
  fetchDirections,
  fetchRefreshedText,
  fetchSectionVariations,
  fetchSingleTemplate,
  fetchTemplates,
  postSite,
} from "../api/api";
import { getToken } from "../../utils/utils";
import {
  SET_DIRECTIONS,
  SET_ELEMENTS,
  SET_SECTIONS_VARIATIONS,
  SET_TEMPLATES,
} from "./actionTypes";

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
    if (response?.status === 200) {
      const { templates } = response.data;
      dispatch({ type: SET_TEMPLATES, templates, directionId });
    }
    return response?.status === 200;
  };
};

export const getSingleTemplateAction = (templateId) => {
  return async (dispatch) => {
    const response = await fetchSingleTemplate(templateId);
    console.log("directions response ===", response?.data);
    if (response?.status === 200) {
      const { elements } = response.data;
      dispatch({ type: SET_ELEMENTS, elements });
    }
    return response?.status === 200;
  };
};

export const createSiteAction = (siteData) => {
  return async (dispatch) => {
    const response = await postSite(siteData);
    console.log("response ===", response.data);
  };
};

export const getSectionVariationsAction = (sectionId) => {
  return async (dispatch) => {
    const response = await fetchSectionVariations(sectionId);
    console.log("response data ===", response?.data);
    if (response.status === 200) {
      const { elements } = response.data;
      dispatch({
        type: SET_SECTIONS_VARIATIONS,
        variations: elements,
        sectionId,
      });
    }
  };
};

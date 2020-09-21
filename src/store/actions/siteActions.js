import {
  fetchDirections,
  fetchHeaderImages,
  fetchRefreshedText,
  fetchSectionVariations,
  fetchSingleTemplate,
  fetchTemplates,
  postSite,
  fetchEditingSite,
  deleteSite,
} from "../api/api";
import { getToken } from "../../utils/utils";
import {
  SET_DIRECTIONS,
  SET_ELEMENTS,
  SET_HEADER_IMAGES,
  SET_SECTIONS_VARIATIONS,
  SET_TEMPLATES,
  SET_EDITING_SITE,
} from "./actionTypes";

export const getEditingSiteAction = (id) => {
  return (dispatch) => {
    fetchEditingSite(id).then((res) => {
      dispatch({ type: SET_EDITING_SITE, site: res.data });
    });
  };
};

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
    const imagesResponse = await fetchHeaderImages(templateId);
    if (response?.status === 200) {
      const { elements } = response.data;
      dispatch({
        type: SET_ELEMENTS,
        elements,
      });
      dispatch({
        type: SET_HEADER_IMAGES,
        headerImages: imagesResponse.data.imgUser,
      });
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

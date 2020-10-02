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
  postService,
  postAdvantage,
  fetchDefaultImages,
  patchUser,
  patchSite,
  postOrder,
} from "../api/api";
import { getToken } from "../../utils/utils";
import {
  SET_DIRECTIONS,
  SET_ELEMENTS,
  SET_HEADER_IMAGES,
  SET_SECTIONS_VARIATIONS,
  SET_TEMPLATES,
  SET_EDITING_SITE,
  ADD_SERVICE,
  SET_DEFAULT_IMAGES,
  ADD_USER_SITE,
  REPLACE_USER_SITE,
} from "./actionTypes";
import rootReducer from "../reducers/rootReducer";

export const getEditingSiteAction = (id) => {
  return (dispatch, getState) => {
    const { lang } = getState().content;
    fetchEditingSite(id, lang).then((res) => {
      console.log("res ===", res.data);
      dispatch({ type: SET_EDITING_SITE, site: res.data });
    });
  };
};

export const getDirectionsAction = () => {
  return async (dispatch) => {
    const response = await fetchDirections(getToken());
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
  return async (dispatch, getState) => {
    const { lang } = getState().content;
    const response = await fetchSingleTemplate(templateId, lang);
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

export const createSiteAction = (siteData, onSitesLimit) => {
  return async (dispatch) => {
    return postSite(siteData)
      .then((res) => {
        const { site } = res.data;
        dispatch({ type: ADD_USER_SITE, site });
        return site.id;
      })
      .catch((e) => {
        console.log("e ===", e.response.status);
        if (e.response.status === 402) {
          onSitesLimit();
        }
        return false;
      });
  };
};

export const editSiteAction = (siteData) => {
  return async (dispatch) => {
    return patchSite(siteData)
      .then((res) => {
        const { site } = res.data;
        dispatch({ type: REPLACE_USER_SITE, site });
        return site.id;
      })
      .catch(() => false);
  };
};

export const getSectionVariationsAction = (sectionId, templateId) => {
  return async (dispatch) => {
    const response = await fetchSectionVariations(sectionId, templateId);
    if (response.status === 200) {
      const { elements } = response.data;
      dispatch({
        type: SET_SECTIONS_VARIATIONS,
        variations: elements,
        sectionId,
        templateId,
      });
    }
  };
};

export const createServiceAction = (service) => {
  return (dispatch, getState) => {
    postService(service)
      .then((res) => {
        const { sections } = getState().site;
        const editedSections = sections.map((section) => {
          const categoryParameters = section.categoryParameters.map((param) => {
            return param.key === "servicesList"
              ? { ...param, value: res.data.services }
              : param;
          });
          return { ...section, categoryParameters };
        });
        dispatch({ type: SET_ELEMENTS, elements: editedSections });
      })
      .catch(console.error);
  };
};

export const createAdvantageAction = (advantage) => {
  return async (dispatch, getState) => {
    postAdvantage(advantage)
      .then((res) => {
        const { sections } = getState().site;
        const editedSections = sections.map((section) => {
          const categoryParameters = section.categoryParameters.map((param) => {
            return param.key === "benefitList"
              ? { ...param, value: res.data.benefits }
              : param;
          });
          return { ...section, categoryParameters };
        });
        dispatch({ type: SET_ELEMENTS, elements: editedSections });
      })
      .catch(console.error);
  };
};

export const getDefaultImagesAction = (templateId, type) => {
  return async (dispatch) => {
    fetchDefaultImages(templateId, type).then((res) => {
      const { imgUser, imgAdmin } = res.data;
      dispatch({
        type: SET_DEFAULT_IMAGES,
        userImages: imgUser,
        adminImages: imgAdmin,
        templateId,
        key: type,
      });
    });
  };
};

export const createOrderAction = (
  orderId,
  siteId,
  tariffId,
  serviceIds,
  amount
) => {
  return async (dispatch) => {
    postOrder({
      orderId,
      siteId,
      tariffId,
      serviceId: serviceIds,
      totalAmount: amount,
    }).then((res) => {});
  };
};

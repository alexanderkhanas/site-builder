import { fetchHomeContent, fetchLanguages } from "../api/api";
import {
  SET_ALL_LANGUAGES,
  SET_HOME_CONTENT,
  SET_LANGUAGE,
} from "./actionTypes";

export const getHomeContentAction = () => {
  return async (dispatch, getState) => {
    const { lang } = getState().content;
    const response = await fetchHomeContent(lang);
    if (response?.status === 200) {
      dispatch({ type: SET_HOME_CONTENT, content: response.data });
    }
  };
};

export const getLanguagesAction = () => {
  return async (dispatch) => {
    fetchLanguages().then((res) => {
      console.log("res ===", res);
      dispatch({
        type: SET_ALL_LANGUAGES,
        langs: res.data.lang,
      });
    });
  };
};

export const changeLanguageAction = (lang) => {
  return {
    type: SET_LANGUAGE,
    lang,
  };
};

import {
  SET_ALL_LANGUAGES,
  SET_HOME_CONTENT,
  SET_LANGUAGE,
} from "../actions/actionTypes";

const initialState = {
  page_content: {
    home: {},
    about: {},
    login: {},
  },
  tariffs: [],
  services: [],
  lang: "ua",
  allLanguages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_CONTENT:
      return {
        ...state,
        ...action.content,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        lang: action.lang,
      };
    case SET_ALL_LANGUAGES:
      return {
        ...state,
        allLanguages: action.langs,
      };
    default:
      return state;
  }
};

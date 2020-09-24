import {
  ADD_USER_SITE,
  DELETE_USER_SITES,
  REPLACE_USER_SITE,
  SET_USER_SITES,
} from "../actions/actionTypes";

const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SITES:
      return {
        ...state,
        all: action.sites,
      };

    case ADD_USER_SITE:
      return {
        ...state,
        all: [...state.all, action.site],
      };

    case DELETE_USER_SITES:
      return {
        ...state,
        all: state.all.filter((site) => site.id !== action.id),
      };
    case REPLACE_USER_SITE:
      return {
        ...state,
        all: state.all.map((site) =>
          site.id === action.site.id ? action.site : site
        ),
      };
    default:
      return state;
  }
};

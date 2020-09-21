import { DELETE_USER_SITES, SET_USER_SITES } from "../actions/actionTypes";

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

    case DELETE_USER_SITES:
      return {
        ...state,
        all: state.all.filter((site) => site.id !== action.id),
      };
    default:
      return state;
  }
};

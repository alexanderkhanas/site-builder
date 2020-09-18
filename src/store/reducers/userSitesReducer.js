import { SET_USER_SITES } from "../actions/actionTypes";

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
    default:
      return state;
  }
};

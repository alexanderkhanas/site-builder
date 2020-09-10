import { SET_DIRECTIONS, SET_TEMPLATES } from "../actions/actionTypes";

const initialState = {
  directions: [],
  templates: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRECTIONS:
      return {
        ...state,
        directions: action.directions,
      };
    case SET_TEMPLATES:
      return {
        ...state,
        templates: {
          ...state.templates,
          [action.directionId]: action.templates,
        },
      };
    default:
      return state;
  }
};

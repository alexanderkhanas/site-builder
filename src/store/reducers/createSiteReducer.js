import {
  SET_DIRECTIONS,
  SET_ELEMENTS,
  SET_TEMPLATES,
} from "../actions/actionTypes";

const initialState = {
  directions: [],
  templates: {},
  sections: [],
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
    case SET_ELEMENTS:
      return {
        ...state,
        sections: action.elements,
      };
    default:
      return state;
  }
};

import {
  ADD_USER_IMAGES,
  DELETE_USER_IMAGE,
  SET_USER_IMAGES,
} from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_IMAGES:
      return {
        ...action.gallery,
      };
    case DELETE_USER_IMAGE:
      return {
        ...state,
        [action.key]: state[action.key].filter((img) => img !== action.img),
      };
    case ADD_USER_IMAGES:
      return {
        ...state,
        [action.key]: [...state[action.key], ...action.images],
      };
    default:
      return state;
  }
};

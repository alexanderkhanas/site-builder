import { ADD_USER_PHOTO, SET_USER } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.user, gallery: [] };
    case ADD_USER_PHOTO:
      return {
        ...state,
        gallery: [...state.gallery, action.image],
      };
    default:
      return state;
  }
};

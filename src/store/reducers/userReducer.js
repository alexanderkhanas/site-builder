import {
  ADD_USER_PHOTO,
  SET_USER,
  SET_USER_AVATAR,
  SET_USER_IMAGES,
} from "../actions/actionTypes";

const initialState = {
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  avatar: "",
  isLogging: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.user, isLogging: false };
    case ADD_USER_PHOTO:
      return {
        ...state,
        gallery: [...state.gallery, action.image],
      };
    case SET_USER_AVATAR:
      return {
        ...state,
        avatar: action.avatar,
      };
    default:
      return state;
  }
};

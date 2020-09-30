import { ADD_MESSAGE, SET_MESSAGES } from "../actions/actionTypes";

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

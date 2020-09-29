import { ADD_MESSAGE } from "../actions/actionTypes";

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
    default:
      return state;
  }
};

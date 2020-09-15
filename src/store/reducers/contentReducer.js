import { SET_HOME_CONTENT } from "../actions/actionTypes";

const initialState = {
  home: {
    page_content: {},
    services: [],
    tariffs: {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_CONTENT:
      return {
        ...state,
        home: action.content,
      };
    default:
      return state;
  }
};

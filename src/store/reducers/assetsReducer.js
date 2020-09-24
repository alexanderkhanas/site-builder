import { HIDE_MODAL, SHOW_MODAL } from "../actions/actionTypes";

const initialState = {
  modal: {
    isVisible: false,
    title: "",
    desc: "",
    onResolve: () => {},
    onReject: () => {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          isVisible: true,
          title: action.title,
          desc: action.desc,
          onResolve: action.onResolve,
          onReject: action.onReject,
        },
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: {
          isVisible: false,
          title: "",
          desc: "",
          onResolve: () => {},
          onReject: () => {},
        },
      };
    default:
      return state;
  }
};

import { HIDE_MODAL, SHOW_MODAL } from "./actionTypes";

export const showModalAction = (title, desc, onResolve, onReject) => {
  return {
    type: SHOW_MODAL,
    title,
    desc,
    onReject,
    onResolve,
  };
};

export const hideModalAction = () => {
  return {
    type: HIDE_MODAL,
  };
};

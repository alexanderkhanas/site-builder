import { emitMessage, subcribeMessagesSocket } from "../api/chatSocket";
import { ADD_MESSAGE } from "./actionTypes";

export const subcribeToMessagesAction = () => {
  return async (dispatch) => {
    const onMessageReceive = (message) => {
      dispatch({ type: ADD_MESSAGE, message });
    };
    subcribeMessagesSocket(onMessageReceive);
  };
};

export const sendMessageAction = (message) => {
  emitMessage(message);
  return {
    type: ADD_MESSAGE,
    message,
  };
};

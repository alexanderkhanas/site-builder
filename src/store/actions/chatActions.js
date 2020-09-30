import { emitMessage, subcribeMessagesSocket } from "../api/chatSocket";
import { ADD_MESSAGE, SET_MESSAGES } from "./actionTypes";
import uuid from "react-uuid";

export const subcribeToMessagesAction = (chatId) => {
  return async (dispatch) => {
    const onMessageUpdated = (messages = []) => {
      console.log("messages ====", messages);
      dispatch({ type: SET_MESSAGES, messages: messages || [] });
    };
    subcribeMessagesSocket(chatId, onMessageUpdated);
  };
};

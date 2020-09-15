import { fetchHomeContent } from "../api/api";
import { SET_HOME_CONTENT } from "./actionTypes";

export const getHomeContentAction = () => {
  return async (dispatch) => {
    const response = await fetchHomeContent();
    if (response?.status === 200) {
      dispatch({ type: SET_HOME_CONTENT, content: response.data });
    }
  };
};

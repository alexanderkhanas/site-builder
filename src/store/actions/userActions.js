import { fetchUser, loginRequest } from "../api/api";
import { SET_USER } from "./actionTypes";

export const loginAction = (data, isRemember) => {
  return async (dispatch) => {
    const response = await loginRequest(data);
    if (response?.status === 200) {
      const { user, token } = response.data;
      localStorage.setItem("_token", token);
      dispatch({ type: SET_USER, user });
    }
    return response?.status === 200;
  };
};

export const getUserAction = () => {
  return async (dispatch) => {
    const response = fetchUser();
    if (response?.status === 200) {
      const { user, token } = response.data;
      localStorage.setItem("_token", token);
      dispatch({ type: SET_USER, user });
    }
    return response?.status === 200;
  };
};

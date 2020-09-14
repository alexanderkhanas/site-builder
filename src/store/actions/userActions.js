import { fetchUser, loginRequest, postImage } from "../api/api";
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
    const response = await fetchUser();
    if (response?.status === 200) {
      const { user } = response.data;
      dispatch({ type: SET_USER, user });
    }
    return response?.status === 200;
  };
};

export const uploadImageAction = (imageFormData) => {
  return async (dispatch) => {
    const response = await postImage(imageFormData);
    console.log("image response ===", response?.data);
    if (response.status === 200) {
    }
    return response?.data;
  };
};

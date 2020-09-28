import {
  fetchUser,
  fetchUserGallery,
  loginFacebookRequest,
  loginRequest,
  logoutUserRequest,
  patchUser,
  postImage,
  postUserAvatar,
  registerRequest,
} from "../api/api";
import {
  CLEAR_USER,
  SET_LOGGING,
  SET_USER,
  SET_USER_AVATAR,
  SET_USER_IMAGES,
} from "./actionTypes";
import _axios from "../api/_axios";
import axios from "axios";

export const loginAction = (data, isRemember) => {
  return async (dispatch) => {
    const response = await loginRequest(data);
    if (response?.status === 200) {
      const { user, token } = response.data;
      localStorage.setItem("_token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch({ type: SET_USER, user });
    }
    return response?.status === 200;
  };
};

export const facebookLoginAction = (data) => {
  return async (dispatch) => {
    loginFacebookRequest(data).then((res) => {
      const { user, token } = res.data;
      localStorage.setItem("_token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch({ type: SET_USER, user });
    });
  };
};

export const registerAction = (data) => {
  return async (dispatch) => {
    const response = await registerRequest(data);
    console.log("response ===", response);
    if (response?.data) {
      const { user, token } = response.data;
      localStorage.setItem("_token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch({ type: SET_USER, user });
    }
    return response?.status === 200;
  };
};

export const getUserAction = () => {
  return async (dispatch) => {
    const isSuccess = await fetchUser()
      .then((res) => {
        const { user } = res.data;
        dispatch({ type: SET_USER, user });
      })
      .catch(() => {
        dispatch({ type: SET_LOGGING, isLogging: false });
      });
    return isSuccess;
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

export const uploadAvatarAction = (imageFormData) => {
  return async (dispatch) => {
    postUserAvatar(imageFormData).then((res) => {
      dispatch({
        type: SET_USER_AVATAR,
        avatar: res.data.url,
      });
    });
  };
};

export const editUserAction = (user) => {
  return async (dispatch) => {
    return patchUser(user)
      .then((response) => {
        console.log("user ===", response.data);
      })
      .catch(() => false);
  };
};

export const logoutUserAction = () => {
  return async (dispatch) => {
    logoutUserRequest().then(() => {
      dispatch({ type: CLEAR_USER });
      localStorage.removeItem("_token");
    });
  };
};

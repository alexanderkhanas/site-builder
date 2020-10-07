import {
  changePasswordRequest,
  fetchUser,
  loginGoogleRequest,
  loginFacebookRequest,
  loginRequest,
  logoutUserRequest,
  patchUser,
  postImage,
  postUserAvatar,
  registerRequest,
} from "../api/api";
import {
  ADD_USER_IMAGES,
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
    return loginRequest(data)
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("_token", token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        dispatch({ type: SET_USER, user });
        return true;
      })
      .catch(() => false);
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

export const googleLoginAction = (data) => {
  return async (dispatch) => {
    loginGoogleRequest(data).then((res) => {
      const { user, token } = res.data;
      localStorage.setItem("_token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch({ type: SET_USER, user });
    });
  };
};

export const registerAction = (data) => {
  return async (dispatch, getState) => {
    const { lang } = getState().content;
    return registerRequest({ ...data, lang })
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("_token", token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        dispatch({ type: SET_USER, user });
        return true;
      })
      .catch(() => false);
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

export const uploadImageAction = (imageFormData, type) => {
  return async (dispatch) => {
    const response = await postImage(imageFormData);
    if (response.status === 200) {
      dispatch({ type: ADD_USER_IMAGES, images: response.data.url, key: type });
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
      .then((response) => {})
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

export const changePasswordAction = (password, code) => {
  return async (dispatch) => {
    return changePasswordRequest({ password, code }).then((res) => {
      dispatch({ type: SET_USER, user: res.data.user });
      return true;
    });
  };
};

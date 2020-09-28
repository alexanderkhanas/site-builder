import {
  deleteUserImagesRequest,
  fetchUserGallery,
  postUserImage,
} from "../api/api";
import {
  ADD_USER_IMAGES,
  DELETE_USER_IMAGE,
  SET_USER_IMAGES,
} from "./actionTypes";

export const getUserGalleryAction = () => {
  return async (dispatch) => {
    fetchUserGallery().then((res) => {
      dispatch({ type: SET_USER_IMAGES, gallery: res.data.files });
    });
  };
};

export const deleteImageAction = (key, img) => {
  return async (dispatch) => {
    deleteUserImagesRequest([img]).then((res) => {
      dispatch({
        type: DELETE_USER_IMAGE,
        key,
        img,
      });
    });
  };
};

export const uploadUserImagesAction = (type, images) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("type", images);
    postUserImage(type, images)
      .then((res) => {
        dispatch({ type: ADD_USER_IMAGES, images: res.data.url, key: type });
      })
      .catch(() => false);
  };
};

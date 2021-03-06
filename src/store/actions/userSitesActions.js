import { deleteSite, fetchUserSites } from "../api/api";
import { DELETE_USER_SITES, SET_USER_SITES } from "./actionTypes";

export const getUserSitesAction = () => {
  return async (dispatch) => {
    const response = await fetchUserSites();
    if (response.status === 200) {
      dispatch({
        type: SET_USER_SITES,
        sites: response.data.sites,
      });
    }
  };
};

export const deleteSiteAction = (id) => {
  return (dispatch) => {
    deleteSite(id).then(() => {
      dispatch({
        type: DELETE_USER_SITES,
        id,
      });
    });
  };
};

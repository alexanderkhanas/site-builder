import { fetchUserSites } from "../api/api";
import { SET_USER_SITES } from "./actionTypes";

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

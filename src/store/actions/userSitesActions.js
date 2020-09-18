import { fetchUserSites } from "../api/api";

export const getUserSitesAction = () => {
  return async (dispatch) => {
    const response = await fetchUserSites();
    if (response.status === 200) {
    }
  };
};

import { combineReducers } from "redux";
import userReducer from "./userReducer";
import createSiteReducer from "./createSiteReducer";
import contentReducer from "./contentReducer";
import userSitesReducer from "./userSitesReducer";

export default combineReducers({
  user: userReducer,
  createSite: createSiteReducer,
  content: contentReducer,
  sites: userSitesReducer,
});

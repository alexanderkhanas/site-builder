import { combineReducers } from "redux";
import userReducer from "./userReducer";
import siteReducer from "./siteReducer";
import contentReducer from "./contentReducer";
import userSitesReducer from "./userSitesReducer";
import assetsReducer from "./assetsReducer";
import galleryReducer from "./galleryReducer";

export default combineReducers({
  user: userReducer,
  site: siteReducer,
  content: contentReducer,
  sites: userSitesReducer,
  assets: assetsReducer,
  gallery: galleryReducer,
});

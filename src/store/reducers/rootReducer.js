import { combineReducers } from "redux";
import userReducer from "./userReducer";
import createSiteReducer from "./createSiteReducer";
import contentReducer from "./contentReducer";

export default combineReducers({
  user: userReducer,
  createSite: createSiteReducer,
  content: contentReducer,
});

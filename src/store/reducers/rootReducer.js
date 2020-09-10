import { combineReducers } from "redux";
import userReducer from "./userReducer";
import createSiteReducer from "./createSiteReducer";

export default combineReducers({
  user: userReducer,
  createSite: createSiteReducer,
});

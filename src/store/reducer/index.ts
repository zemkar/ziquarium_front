import { combineReducers } from "redux";
import authReducers from "./auth";
import userProfileReducers from "./userProfile";

export default combineReducers({
    authReducers,
    userProfileReducers,
});

import { combineReducers } from "redux";
import authReducers from "./auth";
import fishesReducer from "./fishes";
import tankReducer from "./tank";
import userProfileReducers from "./userProfile";

export default combineReducers({
    authReducers,
    userProfileReducers,
    fishesReducer,
    tankReducer,
});

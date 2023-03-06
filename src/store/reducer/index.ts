import { combineReducers } from "redux";
import authReducers from "./auth";
import fishesReducer from "./fishes";
import plantsReducer from "./plants";
import tankReducer from "./tank";
import shopReducer from "./shop";
import userProfileReducers from "./userProfile";

export default combineReducers({
    authReducers,
    userProfileReducers,
    fishesReducer,
    plantsReducer,
    tankReducer,
    shopReducer,
});

import { combineReducers } from "redux";
import userOrderReducer from "../../user/reducer/modals";

import profile from "../../user/reducer/profile";

const userProfileReducers = combineReducers({
    profile,
    userOrderReducer,
});

export default userProfileReducers;

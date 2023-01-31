import { combineReducers } from "redux";

import profile from "../../user/reducer/profile";

const userProfileReducers = combineReducers({
    profile,
});

export default userProfileReducers;

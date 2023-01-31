import { combineReducers } from "redux";
import auth from "../../auth/reducers/auth";
import loginLogoutShow from "../../auth/reducers/loginLogoutShow";

const authReducers = combineReducers({
    loginLogoutShow,
    auth,
});
export default authReducers;

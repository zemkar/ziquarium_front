import { combineReducers } from "redux";
import auth from "../../auth/reducers/auth";
import loginLogoutShow from "../../auth/reducers/loginLogoutShow";

export default combineReducers({
    loginLogoutShow,
    auth,
});

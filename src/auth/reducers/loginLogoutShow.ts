import { 
    SET_LOGIN_SHOW, 
    SET_LOGIN_HIDE, 
    SET_LOGOUT_SHOW, 
    SET_LOGOUT_HIDE, 
    } from "../actions/types";

const initialState = {isLoginShow: false, isLogOutShow: false};

const loginLogoutShowReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action;
    console.log("loginLogoutShowReducer", payload);
    

    switch (type) {
        case SET_LOGIN_SHOW:
            return { ...state, isLoginShow: true };

        case SET_LOGIN_HIDE:
            return { ...state, isLoginShow: false };

        case SET_LOGOUT_SHOW:
            return { ...state, isLogOutShow: true };

        case SET_LOGOUT_HIDE:
            return { ...state, isLogOutShow: false };

        default:
            return state;
    }
}

export default loginLogoutShowReducer
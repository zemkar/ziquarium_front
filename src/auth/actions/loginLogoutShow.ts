import { SET_LOGIN_SHOW, SET_LOGIN_HIDE, SET_LOGOUT_SHOW, SET_LOGOUT_HIDE } from "./types";

export const showLogin = () => ({
    type: SET_LOGIN_SHOW,
    payload: {isLoginShow: true, isLogOutShow: false},
  });
  
  export const hideLogin = () => ({
    type: SET_LOGIN_HIDE,
    payload: {isLoginShow: false, isLogOutShow: false},
  });

  export const showLogOut = () => ({
    type: SET_LOGOUT_SHOW,
    payload: {isLoginShow: false, isLogOutShow: true},
  });
  
  export const hideLogOut = () => ({
    type: SET_LOGOUT_HIDE,
    payload: {isLoginShow: false, isLogOutShow: false},
  });
    

import { toast } from 'react-toastify';
import { userRegistrationData, userTokens } from "../interfaces";
import authService from "../service/authService";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "./types";
  
  
  
  export const register = (regData: userRegistrationData) => (dispatch:any) => {
    return authService.register(regData).then(
      (response:any) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        toast.success("Registration success");
        return Promise.resolve();
      },
      (error:any) => {
        dispatch({
          type: REGISTER_FAIL,
        });
        toast.error("Registration fail");
        return Promise.reject(error.response.data);
      }
    );
  };
  
  export const login = (username: string, password: string) => (dispatch:any) => {
    return authService.login(username, password)
    .then((data: any) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        toast.success("Login success");
        return Promise.resolve();
      },
      (error:any) => {
        dispatch({
          type: LOGIN_FAIL,
        });
        toast.error("Login fail");
        return Promise.reject();
      }
    );
  };
  
  export const logout = (userTokens:userTokens) => (dispatch:any) => {
    dispatch({ type: LOGOUT, })
    authService.logout(userTokens);
    authService.loggedUserRemove();
    toast.warn("Logged out");
  };
  
  export const dropLogin = () => (dispatch:any) => {
    dispatch({ type: LOGOUT, })
    authService.loggedUserRemove();
    toast.warn("Logged out");
  };
  
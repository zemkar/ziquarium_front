
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
        console.log("actions auth | success",
          "\n1)", response?.data?.detail, 
          "\n2)", response?.data, 
          "\n3)", response, 
          "\n4)", response?.statusText);

        dispatch({
          type: REGISTER_SUCCESS,
        });

        toast.success("Registration success");

        return Promise.resolve();
      },
      (error:any) => {
        console.log("actions auth | error\n1)", error?.response?.data?.detail, 
          "\n2)", error?.response?.data, 
          "\n3)", error?.response, 
          "\n4)", error?.response?.statusText);

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
        console.log("actions auth | error\n1)", error?.response?.data?.detail, "\n2)", error?.response?.data, "\n3)", error?.response, "\n______________");
        
        dispatch({
          type: LOGIN_FAIL,
        });
        
        toast.error("Login fail");
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = (userTokens:userTokens) => (dispatch:any) => {
    console.log("actions auth logout");
    dispatch({ type: LOGOUT, })
    authService.logout(userTokens);
    authService.loggedUserRemove();
    toast.warn("Logged out");
  };
  
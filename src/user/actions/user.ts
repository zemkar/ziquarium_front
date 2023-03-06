
import { toast } from 'react-toastify';
import { userProfile } from "../interface";
import userService from "../service/userService";
import { logout } from '../../auth/actions/auth';

import { CLEAR_USER_PROFILE, SET_USER_PROFILE } from "./types";

export const loadUserProfile = () => (dispatch: any) => {
    return userService.getProfile()
        .then((data: any) => {
            console.log("action user | loadUserProfile \n got data:\n", data.data);
            dispatch({
                type: SET_USER_PROFILE,
                payload: data.data,
            });
            return Promise.resolve<userProfile>(data);
        }, (error: any) => {
            console.log("action user | loadUserProfile \n got error: ", error);
            if (error.response.status !== 401) {
                toast.error("Can't load profile");
            } else {
                var tokens = { access: localStorage.getItem("access") || "", refresh: localStorage.getItem("refresh") || "" }
                dispatch(logout(tokens))
                toast.error("Authentication error - Logged out");
                return Promise.reject("Authentication error");
            }
            return Promise.reject(error);
        }
        );
};

export const clearStoreUserProfile = () => (dispatch: any) => {

    dispatch({
        type: CLEAR_USER_PROFILE,
        payload: null,
    });
}

export const deleteUserProfile = () => (dispatch: any) => {
    userService.deleteUser()
   
    dispatch({
        type: CLEAR_USER_PROFILE,
        payload: null,
    });
}
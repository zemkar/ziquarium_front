
import { fish, fishProfileData } from "../interfaces";
import fishService from "../service/fishService";
import { toast } from 'react-toastify';


import { GET_FISH_PROFILE, 
    GET_FISHES, 
    CLEAR_FISH_PROFILE, 
    GET_FISH_CATEGORIES, 
    FISH_REGISTER_SUCCESS, 
    FISH_REGISTER_FAIL, 
    ADD_FISH_CATEGORY,
    DELETE_FISH,
    SET_FISH_MODALS_HIDE,
    } from "./types"; //

import { LOGOUT } from "../../auth/actions/types";

export const addFish = (fishData: any) => (dispatch: any) => {
    return fishService.addFish(fishData)
        ?.then((res: any) => {
            console.log("addFish res:\n", res.data);
            toast.success("Fish registered");
            dispatch({
                type: FISH_REGISTER_SUCCESS,
                payload: res.data,
            });
            return Promise.resolve<fishProfileData>(res.data);
        }, (err: any) => {
            toast.error("Can't registering fish");
            console.log("addFish got error: \n", err);
            dispatch({
                type: FISH_REGISTER_FAIL,
            });
            if (err.response.status === 401) {
                dispatch({ type: LOGOUT, });
                toast.error("Authorization error, please login again");
            }
            if (err.response.status === 400) {
                var msg: string = err.response?.data || err.response?.data?.name || "Bad request"
                toast.error(msg);
            }
            return Promise.reject(err);
        })
}

export const addCategory = (categoryName: string) => (dispatch: any) => {
    return fishService.addFishCategory(categoryName)
        ?.then((res: any) => {
            console.log("fish - actions - addCategory res", res.data);
            toast.success("Category added");
            dispatch({
                type: ADD_FISH_CATEGORY,
                payload: res.data,
            })
            return Promise.resolve<any>(res.data)
        }, (err: any) => {
            console.log("fish - actions - addCategory Error", err);
            if (err.response.status === 400) {
                toast.error("Already exist")
            }
            if (err.response.status === 401) {
                dispatch({ type: LOGOUT, });
                toast.error("Authorization error, please login again");
            }
            if (err.response.status === 500) {
                toast.error("Server error")
            }
            return Promise.reject(err);
        })
}

export const getFishProfile = (id: number) => (dispatch: any) => {
    return fishService.getFishProfile(id)
        .then((res: any) => {
            console.log("getFishProfile res:\n", res.data);
            dispatch({
                type: GET_FISH_PROFILE,
                payload: res.data,
            });
            return Promise.resolve<fishProfileData>(res.data);
        }, (err: any) => {
            toast.error("Can't load profile");
            console.log("getFishProfile got error: \n", err);
            dispatch({
                type: CLEAR_FISH_PROFILE,
            });
            return Promise.reject(err);
        })

}

export const getFishes = () => async (dispatch: any) => {
    return await fishService.getFishes()
        .then((res: any) => {
            console.log("getFishes res:\n", res);
            toast.success("Fishes loaded");
            dispatch({
                type: GET_FISHES,
                payload: res.data,
            });
            return res.data;
        },
            (err: any) => {
                if (err.response.status === 500) {
                    toast.error(err.response.statusText);
                    return Promise.reject(err.response.statusText);
                }
                console.log("getFishes err:", err);
            })
}

export const getFishCategories = () => (dispatch: any) => {
    return fishService.getFishesCategories()
        .then((res) => {
            console.log("getFishCategories res:\n", res.data);
            dispatch({
                type: GET_FISH_CATEGORIES,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log("getFishCategories error:\n", err);
        })
}

export const modFishProfile = (modifiedFishProfile: fishProfileData) => (dispatch: any) => {
    return fishService.modFishProfile(modifiedFishProfile)
        ?.then((res: any) => {
            console.log("Fish profile modified: \n", res);
        })
        .catch((err: any) => {
            console.log("Fish profile can't be modified: \n", err);
            if (err.response.status === 401) {
                dispatch({ type: LOGOUT, });
                dispatch({type: SET_FISH_MODALS_HIDE});
                toast.error("Authorization error, please login again");
            }
        })
}

export const deleteFish = (id: number) => (dispatch: any) => {
    return fishService.delFish(id)
    ?.then((res:any) => {
        console.log("fish - actions - deleteFish res", res);
        toast.warning("Fish deleted");
        dispatch({type: DELETE_FISH});
        dispatch({type: SET_FISH_MODALS_HIDE});
    }, (err:any) => {console.log("fish - actions - deleteFish error", err);})
}
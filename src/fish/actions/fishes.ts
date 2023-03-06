
import { fish } from "../interfaces";
import fishService from "../service/fishService";
import { toast } from 'react-toastify';


import {
    FISHES_GET, 
    FISHES_EDIT_PROFILE_SUCCESS,
    FISHES_EDIT_PROFILE_FAIL,
    FISHES_GET_CATEGORIES, 
    FISHES_REGISTER_SUCCESS, 
    FISHES_REGISTER_FAIL, 
    FISHES_ADD_CATEGORY,
    FISHES_DELETE,
    FISHES_SET_MODALS_HIDE,
    FISHES_CLEAR,
    } from "./types"; //

import { LOGOUT } from "../../auth/actions/types";

export const addFish = (fishData: any) => (dispatch: any) => {
    return fishService.addFish(fishData)
        ?.then((res: any) => {
            console.log("addFish res:\n", res.data);
            toast.success("Fish registered");
            dispatch({
                type: FISHES_REGISTER_SUCCESS,
                payload: res.data,
            });
            return Promise.resolve<fish>(res.data);
        }, (err: any) => {
            toast.error("Can't registering fish");
            console.log("addFish got error: \n", err);
            dispatch({
                type: FISHES_REGISTER_FAIL,
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
                type: FISHES_ADD_CATEGORY,
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

export const getFishes = () => async (dispatch: any) => {
    return await fishService.getFishes()
        .then((res: any) => {
            console.log("getFishes res:\n", res);
            if (res.data.length > 0) {
            toast.success("Fishes loaded");
            dispatch({
                type: FISHES_GET,
                payload: res.data,
            });
            return res.data;
        } else {
            toast.warning("No fishes in data base");
            dispatch({
                type: FISHES_GET,
                payload: [{id:0, name:"No stored fishes"}],
            });
            return res.data;}
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
            if (res.data.length > 0) {
            dispatch({
                type: FISHES_GET_CATEGORIES,
                payload: res.data,
            });
        } else {
            dispatch({
                type: FISHES_GET_CATEGORIES,
                payload: [{id:0, name:"no stored categories"}],
            });}
        })
        .catch((err) => {
            console.log("getFishCategories error:\n", err);
            if (err.response.status === 500) {
                toast.error("Server error")
            }
        })
}
export const deleteFish = (id: number) => (dispatch: any) => {
    return fishService.delFish(id)
    ?.then((res:any) => {
        console.log("fish - actions - deleteFish res", res);
        toast.warning("Fish deleted");
        dispatch({type: FISHES_DELETE});
        dispatch({type: FISHES_SET_MODALS_HIDE});
    }, (err:any) => {
        console.log("fish - actions - deleteFish error", err);
        if (err.response.status === 401) {
            dispatch({ type: LOGOUT, });
            dispatch({type: FISHES_SET_MODALS_HIDE});
            toast.error("Authorization error, please login again");
        }
        else if (err.response.status === 500) {
            toast.error("Server error")
        }
        else toast.error("Error");
        return Promise.reject()
    })
}



export const modFish = (fishData: any) => (dispatch: any) => {
    console.log("DATA TO MOD:", fishData);
    
    return fishService.modFish(fishData)
        ?.then((res: any) => {
            console.log("DATA AFTER MOD:\n", res.data);
            toast.success("Fish edited");
            dispatch({
                type: FISHES_EDIT_PROFILE_SUCCESS,
                payload: res.data,
            });
            return Promise.resolve<fish>(res.data);
        }, (err: any) => {
            toast.error("Can't edit fish");
            console.log("modPlant got error: \n", err);
            dispatch({
                type: FISHES_EDIT_PROFILE_FAIL,
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

export const clearFishes = () => (dispatch: any) => {
    dispatch({ type: FISHES_CLEAR, });
}
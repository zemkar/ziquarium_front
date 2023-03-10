
import { plantData } from "../interfaces";
import plantService from "../service/plantsService";
import { toast } from 'react-toastify';


import { 
    PLANTS_GET, 
    PLANTS_EDIT_PROFILE_SUCCESS,
    PLANTS_EDIT_PROFILE_FAIL,
    PLANTS_GET_CATEGORIES, 
    PLANTS_REGISTER_SUCCESS, 
    PLANTS_REGISTER_FAIL, 
    PLANTS_ADD_CATEGORY,
    PLANTS_DELETE,
    PLANTS_SET_MODALS_HIDE,
    PLANTS_CLEAR,
    } from "./types"; //

import { LOGOUT } from "../../auth/actions/types";

export const addPlant = (plantData: any) => (dispatch: any) => {
    return plantService.addPlant(plantData)
        ?.then((res: any) => {
            // console.log("addPlant res:\n", res.data);
            toast.success("Plant registered");
            dispatch({
                type: PLANTS_REGISTER_SUCCESS,
                payload: res.data,
            });
            return Promise.resolve<plantData>(res.data);
        }, (err: any) => {
            toast.error("Can't registering plant");
            // console.log("addPlant got error: \n", err);
            dispatch({
                type: PLANTS_REGISTER_FAIL,
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
    return plantService.addPlantsCategory(categoryName)
        ?.then((res: any) => {
            // console.log("plant - actions - addCategory res", res.data);
            toast.success("Category added");
            dispatch({
                type: PLANTS_ADD_CATEGORY,
                payload: res.data,
            })
            return Promise.resolve<any>(res.data)
        }, (err: any) => {
            // console.log("plant - actions - addCategory Error", err);
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

export const getPlants = () => async (dispatch: any) => {
    return await plantService.getPlants()
        .then((res: any) => {
            // console.log("getPlants res:\n", res);
            if (res.data.length > 0) {
            // toast.success("Plant loaded");
            dispatch({
                type: PLANTS_GET,
                payload: res.data,
            });
            return res.data;
        } else {
            toast.warning("No plants in data base");
            dispatch({
                type: PLANTS_GET,
                payload: [{id:0, name:"No stored plants"}],
            });
            return res.data;
        }
        },
            (err: any) => {
                if (err.response.status === 500) {
                    toast.error(err.response.statusText);
                    return Promise.reject(err.response.statusText);
                }
                // console.log("getPlants err:", err);
            })
}

export const getPlantCategories = () => (dispatch: any) => {
    return plantService.getPlantsCategories()
        .then((res:any) => {
            // console.log("getPlantCategories res:\n", res.data);
            if (res.data.length > 0) {
            dispatch({
                type: PLANTS_GET_CATEGORIES,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PLANTS_GET_CATEGORIES,
                payload: [{id:0, name:"no stored categories"}],
            });}
        })
        .catch((err:any) => {
            // console.log("getPlantCategories error:\n", err);
            if (err.response.status === 500) {
                toast.error("Server error")
            }
        })
}


export const deletePlant = (id: number) => (dispatch: any) => {
    return plantService.delPlant(id)
    ?.then((res:any) => {
        // console.log("plant - actions - deletePlant res", res);
        toast.warning("Plant deleted");
        dispatch({type: PLANTS_DELETE});
        dispatch({type: PLANTS_SET_MODALS_HIDE});
    }, (err:any) => {
        // console.log("Plant - actions - deletePlant error", err);
        if (err.response.status === 401) {
            dispatch({ type: LOGOUT, });
            dispatch({ type: PLANTS_SET_MODALS_HIDE });
            toast.error("Authorization error, please login again");
        }
        else if (err.response.status === 500) {
            toast.error("Server error")
        }
        else toast.error("Error");
        return Promise.reject()
    })
}


export const modPlant = (plantData: any) => (dispatch: any) => {
    // console.log("DATA TO MOD:", plantData);
    
    return plantService.modPlant(plantData)
        ?.then((res: any) => {
            // console.log("DATA AFTER MOD:\n", res.data);
            toast.success("Plant saved");
            dispatch({
                type: PLANTS_EDIT_PROFILE_SUCCESS,
                payload: res.data,
            });
            return Promise.resolve<plantData>(res.data);
        }, (err: any) => {
            toast.error("Can't edit plant");
            // console.log("modPlant got error: \n", err);
            dispatch({
                type: PLANTS_EDIT_PROFILE_FAIL,
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

export const clearPlants = () => (dispatch: any) => {
    dispatch({ type: PLANTS_CLEAR, });
}
import {
    SHOP_GET_ITEMS_SUCCESS,
    SHOP_GET_ITEMS_FAIL,
} from "./types";
import shopService from "../service/shopService"
import { toast } from "react-toastify";
import { LOGOUT } from "../../auth/actions/types";



export const getShopData = () => (dispatch: any) => {
    return shopService.getShopItemsData()
        ?.then((res: any) => {
            // console.log("getShopData:\n", res.data);
            // toast.success("Sale data loaded");
            dispatch({
                type: SHOP_GET_ITEMS_SUCCESS,
                payload: res.data,
            });
            return Promise.resolve(res.data);
        }, (err: any) => {
            toast.error("Sale data loading error");
            // console.log("getShopData got error: \n", err);
            dispatch({
                type: SHOP_GET_ITEMS_FAIL,
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

export const modShopData = (data: any) => (dispatch: any) => {
    return shopService.modShopItemData(data)
        .then((res: any) => {
            // console.log("Edition saved", res);
            // toast.success("Sale data loaded");
            return Promise.resolve(res.data);

        }, (err: any) => {
            // console.log("modShopData fail", err);
            toast.warning("Edition fail");
            return Promise.reject(err);
        })
}
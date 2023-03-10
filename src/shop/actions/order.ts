import {
    SHOP_CREATE_ORDER_SUCCESS,
    SHOP_CREATE_ORDER_FAIL,
} from "./types";
import shopService from "../service/shopService"
import { toast } from "react-toastify";


export const createOrder = (data: any) => (dispatch: any) => {
    return shopService.createOrder(data)
        .then((res: any) => {
            dispatch({
                type: SHOP_CREATE_ORDER_SUCCESS,
                payload: res
            })
            // console.log("Order created", res);
            // toast.success("Order created");
            return Promise.resolve(res.data);

        }, (err: any) => {
            dispatch({
                type: SHOP_CREATE_ORDER_FAIL,
            })
            // console.log("Order creation fail", err);
            toast.warning("Order creation fail");
            return Promise.reject(err);
        })
}
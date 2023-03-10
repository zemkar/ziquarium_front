import {
    SHOP_LOAD_ORDERS,
    SHOP_CLEAR_ORDERS,
    SHOP_LOAD_PAYMENTS,
} from "./types";
import shopService from "../service/shopService"
import { toast } from "react-toastify";


export const getOrders = () => (dispatch: any) => {
    return shopService.getOrders()
        .then((res: any) => {
            dispatch({
                type: SHOP_LOAD_ORDERS,
                payload: res.data
            })
            shopService.getUserPayments()
                .then((r: any) => {
                    dispatch({
                        type: SHOP_LOAD_PAYMENTS,
                        payload: r.data
                    })},
                    (e:any)=>{
                        // console.error("get payments", e)
                    }
                    )
            // console.log("Orders loaded", res);
            return Promise.resolve(res.data);

        }, (err: any) => {
            dispatch({
                type: SHOP_CLEAR_ORDERS,
            })
            // console.error("Orders loading fail", err);
            toast.warning("orders loading fail");
            return Promise.reject(err);
        })
}
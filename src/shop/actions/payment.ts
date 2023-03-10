import {
    SHOP_CREATE_PAYMENT_SUCCESS,
    SHOP_CREATE_PAYMENT_FAIL,
} from "./types";
import shopService from "../service/shopService"
import { toast } from "react-toastify";


export const createPayment = (id: number) => (dispatch: any) => {
    return shopService.checkout(id)
                .then((res:any)=>{
                    dispatch({
                        type: SHOP_CREATE_PAYMENT_SUCCESS,
                        payload: res.data
                    })
            // toast.success("checkout creation success");
            return Promise.resolve(res.data);

        }, (err: any) => {
            dispatch({
                type: SHOP_CREATE_PAYMENT_FAIL,
            })
            // console.log("checkout creation fail", err);
            toast.warning("Some error");
            return Promise.reject(err);
        })
}
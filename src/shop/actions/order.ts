import {
    SHOP_GET_ITEMS_SUCCESS,
    SHOP_GET_ITEMS_FAIL,
} from "./types";
import shopService from "../service/shopService"
import { toast } from "react-toastify";
import { LOGOUT } from "../../auth/actions/types";


export const createOrder = (data: any) => (dispatch: any) => {
    return shopService.createOrder(data)
        .then((res: any) => {
            console.log("Order created", res);
            toast.success("Order created");
            return Promise.resolve(res.data);

        }, (err: any) => {
            console.log("Order creation fail", err);
            toast.warning("Order creation fail");
            return Promise.reject(err);
        })
}

import userService from "../service/userService";

import { CLEAR_USER_ORDER, GET_USER_ORDER } from "./types";

export const getUserOrder = (id: number) => (dispatch: any) => {
    // console.log("action user | loadUserProfile \n got data:\n");

    dispatch({
        type: GET_USER_ORDER,
        payload: id,
    });
};

export const clearUserOrder = () => (dispatch: any) => {
    dispatch({
        type: CLEAR_USER_ORDER,
        payload: null,
    });
}

export const deleteUserOrder = (id: number) => (dispatch: any) => {
    userService.deleteUserOrder(id)
        .then((res: any) => {
            // console.log("order delete:", res);
            dispatch({
                type: CLEAR_USER_ORDER,
                payload: null,
            });
        }, (err: any) => {
            // console.error("order delete", err);

        })

}
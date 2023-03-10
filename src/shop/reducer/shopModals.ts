import { LOGOUT } from "../../auth/actions/types";
import {
    SHOP_SET_MODALS_HIDE,
    SHOP_SET_SALE_DATA_SHOW,
    SHOP_SET_SALE_EDITOR_SHOW,
} from "../actions/types";


const initialState = {
    isSaleDataShow: { status: false, itemId: null },
    isSaleEditorShow: { status: false, itemId: null },
    isOrderShow: false
};


const shopModalReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;

    switch (type) {
        case SHOP_SET_MODALS_HIDE || LOGOUT:
            // console.log("SHOP_SET_MODALS_HIDE", initialState);
            return initialState;

        case SHOP_SET_SALE_DATA_SHOW:
            // console.log("SHOP_SET_SALE_DATA_SHOW", { ...initialState, ...payload });
            return { ...initialState, ...payload };

        case SHOP_SET_SALE_EDITOR_SHOW:
            // console.log("SHOP_SET_SALE_EDITOR_SHOW", { ...initialState, ...payload });
            return { ...initialState, ...payload };

        default:
            return state;
    }
}


export default shopModalReducer;

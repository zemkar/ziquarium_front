
import {
    SHOP_SET_MODALS_HIDE,
    SHOP_SET_SALE_DATA_SHOW,
    SHOP_SHOW_CART,
    SHOP_SET_SALE_EDITOR_SHOW,
} from "./types";

export const showCart = () => ({
    type: SHOP_SHOW_CART,
});

export const hideSaleModals = () => ({
    type: SHOP_SET_MODALS_HIDE,
});

export const showToBuyCard = (id:number) => ({
    type: SHOP_SET_SALE_DATA_SHOW,
    payload: { isSaleDataShow: {status: true, itemId: id} },
});

export const showSaleEditor = (id:number) => ({
    type: SHOP_SET_SALE_EDITOR_SHOW,
    payload: { isSaleEditorShow: {status: true, itemId: id} },
});
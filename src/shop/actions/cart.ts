
import {
    SHOP_CHANGE_ITEM_IN_CART,
    SHOP_CLEAR_ITEMS_IN_CART,
    SHOP_RESTORE_ITEM_IN_CART,
} from "./types";

export const cartItemAmount = (id:number, amount:number, price:number, discount:number=0) => (dispatch: any) => {
    // console.log("cartItemAmount get", {id, amount, price, discount});
    
    var total: number = 0
    if (discount > 0) total = amount * (price - Math.floor((price * discount)/100))
    else total = amount * price;
    
    // console.log("cartItemAmount send", {id, amount, price, total});
    dispatch({ 
        type: SHOP_CHANGE_ITEM_IN_CART,
        payload: {id, amount, price, total}
     });
}

export const restoreCart = () => (dispatch: any) => {
    // console.log("restoreCart");
    var storedItems = localStorage.getItem("cartItems")
    if (storedItems) storedItems = JSON.parse(storedItems)
    dispatch({ 
        type: SHOP_RESTORE_ITEM_IN_CART,
        payload: storedItems
     });
}

export const clearCart = () => (dispatch: any) => {
    dispatch({ 
        type: SHOP_CLEAR_ITEMS_IN_CART,
     });
}
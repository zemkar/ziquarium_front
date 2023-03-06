import {
    SHOP_CHANGE_ITEM_IN_CART,
    SHOP_CLEAR_ITEMS_IN_CART,
    SHOP_REMOVE_ITEM_FROM_CART,
    SHOP_RESTORE_ITEM_IN_CART
} from "../actions/types";
import { cartFiller, itemInCart } from "../interfaces";


const initialState:cartFiller = { cartItems: [] };


const shopCartReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;
    var cartItems: itemInCart[];
    var itemIndex: number;

    switch (type) {
        case SHOP_RESTORE_ITEM_IN_CART:
            return { cartItems: payload };

        case SHOP_CHANGE_ITEM_IN_CART:
            cartItems = state.cartItems
            itemIndex = cartItems.findIndex((e: any) => { return +e.id === +payload.id })
            if (itemIndex >= 0) {
                if (payload.amount > 0) cartItems[itemIndex] = payload
                else cartItems.splice(itemIndex, 1)
            }
            else cartItems.push(payload)
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return { cartItems };

        case SHOP_REMOVE_ITEM_FROM_CART:
            cartItems = state.cartItems
            cartItems = cartItems.filter((fish: any) => { return fish.id !== +payload.id })
            if (cartItems.length > 0) localStorage.setItem('cartItems', JSON.stringify(cartItems))
            else localStorage.removeItem('cartItems')
            return { ...state, cartItems };

        case SHOP_CLEAR_ITEMS_IN_CART:
            console.log("REMOVE_ALL_FISH_FROM_TANK", initialState);
            localStorage.removeItem('cartItems')
            return initialState;   // return empty list of fishes and current list of plants


        default:
            return state;
    }
}


export default shopCartReducer;

import { combineReducers } from "redux";
import orderReducer from "../../shop/reducer/order";
import shopItemsReducer from "../../shop/reducer/shop";
import shopCartReducer from "../../shop/reducer/shopCart";
import shopModalReducer from "../../shop/reducer/shopModals";
import userOrdersReducer from "../../shop/reducer/userOrders";

const shopReducers = combineReducers({
    shopItemsReducer,
    shopModalReducer,
    shopCartReducer,
    orderReducer,
    userOrdersReducer,
});

export default shopReducers;

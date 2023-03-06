import { combineReducers } from "redux";

import shopItemsReducer from "../../shop/reducer/shop";
import shopCartReducer from "../../shop/reducer/shopCart";
import shopModalReducer from "../../shop/reducer/shopModals";

const shopReducers = combineReducers({
    shopItemsReducer,
    shopModalReducer,
    shopCartReducer,
});

export default shopReducers;

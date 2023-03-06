import {
    SHOP_CREATE_ORDER_SUCCESS,
    SHOP_CREATE_ORDER_FAIL,
  } from "../actions/types";
  
  
  const initialState = { orderData: null };
  
  
  const shopItemsReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;
  
    switch (type) {
      case SHOP_CREATE_ORDER_SUCCESS:
        return { orderData: payload };
  
        case SHOP_CREATE_ORDER_FAIL:
          return { orderData: null };
    
      default:
        return state;
    }
  }
  
  
  export default shopItemsReducer;
  
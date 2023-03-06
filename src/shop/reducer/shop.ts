import {
  SHOP_GET_ITEMS_SUCCESS,
  SHOP_GET_ITEMS_FAIL,
} from "../actions/types";


const initialState = { shopItemsData: null };


const shopItemsReducer = (state = initialState, action: { type: string, payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case SHOP_GET_ITEMS_SUCCESS:
      return { shopItemsData: payload };

      case SHOP_GET_ITEMS_FAIL:
        return { shopItemsData: null };
  
    default:
      return state;
  }
}


export default shopItemsReducer;

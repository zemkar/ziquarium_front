import { LOGOUT } from "../../auth/actions/types";
import {
  SHOP_LOAD_ORDERS,
  SHOP_CLEAR_ORDERS,
  SHOP_CLEAR_ALL,
  SHOP_LOAD_PAYMENTS,
} from "../actions/types";


const initialState = { userOrders: null, userPayments: null };


const userOrdersReducer = (state = initialState, action: { type: string, payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case SHOP_LOAD_ORDERS:
      return { ...state, userOrders: payload };
    
      case SHOP_LOAD_PAYMENTS:
        return { ...state, userPayments: payload };

    case SHOP_CLEAR_ORDERS || SHOP_CLEAR_ALL || LOGOUT:
      return { userOrders: null, userPayments: null };

    default:
      return state;
  }
}


export default userOrdersReducer;

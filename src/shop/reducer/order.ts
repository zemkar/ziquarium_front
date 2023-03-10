import { LOGOUT } from "../../auth/actions/types";
import {
  SHOP_CREATE_ORDER_SUCCESS,
  SHOP_CREATE_ORDER_FAIL,
  SHOP_CLEAR_ORDER,
  SHOP_CREATE_PAYMENT_SUCCESS,
  SHOP_CREATE_PAYMENT_FAIL,
  SHOP_CLEAR_PAYMENT,
  SHOP_CLEAR_ALL,
} from "../actions/types";


const initialState = { orderData: null, paymentData: null };


const orderReducer = (state = initialState, action: { type: string, payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case SHOP_CREATE_ORDER_SUCCESS:
      return { ...state, orderData: payload };

    case SHOP_CREATE_ORDER_FAIL || SHOP_CLEAR_ORDER:
      return { ...state, orderData: null };

    case SHOP_CREATE_PAYMENT_SUCCESS:
      return { ...state, paymentData: payload };

    case SHOP_CREATE_PAYMENT_FAIL || SHOP_CLEAR_PAYMENT:
      return { ...state, paymentData: null };

    case SHOP_CLEAR_ALL || LOGOUT:
      return { orderData: null, paymentData: null };

    default:
      return state;
  }
}


export default orderReducer;

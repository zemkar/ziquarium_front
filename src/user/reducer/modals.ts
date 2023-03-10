import {GET_USER_ORDER, CLEAR_USER_ORDER} from "../actions/types";
  

const initialState = {order: null};


const userOrderReducer = (state = initialState, action:{type:string, payload?:any}) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USER_ORDER:
        return { order: payload };

      case CLEAR_USER_ORDER:
        return { order: null };
        
      default:
        return state;
    }
  }
  
  
  export default userOrderReducer;
import {
    CLEAR_FISHES_DATA, GET_FISHES_DATA
  } from "../actions/types";
  
  
  const initialState = { fishes_data: null };
  
  
  const fishesReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FISHES_DATA:
        return { fishes_data: payload };
  
      case CLEAR_FISHES_DATA:
        return { fishes_data: null };
  
      default:
        return state;
    }
  }
  
  
  export default fishesReducer;
  
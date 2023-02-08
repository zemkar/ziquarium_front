import {
    GET_FISH_PROFILE, CLEAR_FISH_PROFILE
  } from "../actions/types";

  
const initialState = {fishData: null};


const fishProfileReducer = (state = initialState, action:{type:string, payload?:any}) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FISH_PROFILE:
        return { fishData: payload };

      case CLEAR_FISH_PROFILE:
        return { fishData: null };
        
      default:
        return state;
    }
  }
  
  
  export default fishProfileReducer;

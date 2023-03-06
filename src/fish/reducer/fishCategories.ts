import {
    FISHES_GET_CATEGORIES, FISHES_CLEAR_CATEGORIES
  } from "../actions/types";

  
const initialState = {fishCategories: null};


const fishCategoriesReducer = (state = initialState, action:{type:string, payload?:any}) => {
    const { type, payload } = action;
  
    switch (type) {
      case FISHES_GET_CATEGORIES:
        return { fishCategories: payload };

      case FISHES_CLEAR_CATEGORIES:
        return { fishCategories: null };
        
      default:
        return state;
    }
  }
  
  
  export default fishCategoriesReducer;

import {
    GET_FISH_CATEGORIES, CLEAR_FISH_CATEGORIES
  } from "../actions/types";

  
const initialState = {fishCategories: null};


const fishCategoriesReducer = (state = initialState, action:{type:string, payload?:any}) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FISH_CATEGORIES:
        return { fishCategories: payload };

      case CLEAR_FISH_CATEGORIES:
        return { fishCategories: null };
        
      default:
        return state;
    }
  }
  
  
  export default fishCategoriesReducer;

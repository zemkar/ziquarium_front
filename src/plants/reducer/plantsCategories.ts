import {
    PLANTS_GET_CATEGORIES, PLANTS_CLEAR_CATEGORIES
  } from "../actions/types";

  
const initialState = {plantsCategories: null};


const plantsCategoriesReducer = (state = initialState, action:{type:string, payload?:any}) => {
    const { type, payload } = action;
  
    switch (type) {
      case PLANTS_GET_CATEGORIES:
        return { plantsCategories: payload };

      case PLANTS_CLEAR_CATEGORIES:
        return { plantsCategories: null };
        
      default:
        return state;
    }
  }
  
  
  export default plantsCategoriesReducer;

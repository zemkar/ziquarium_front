import { combineReducers } from "redux";

import plantsCategories from "../../plants/reducer/plantsCategories";
import plants from "../../plants/reducer/plants";
import plantModals from "../../plants/reducer/plantsModals";
import plantFilters from "../../plants/reducer/plantsFilters";
import plantsAddCategoryReducer from "../../plants/reducer/plantsShowAddCategory";

const plantsReducers = combineReducers({
    plants,
    plantModals,
    plantsCategories,
    plantFilters,
    plantsAddCategoryReducer,
});

export default plantsReducers;

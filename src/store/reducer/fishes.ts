import { combineReducers } from "redux";

import categories from "../../fish/reducer/fishCategories";
import fishes from "../../fish/reducer/fishes";
import fishAddCategoryReducer from "../../fish/reducer/fishesShowAddCategory";
import fishModals from "../../fish/reducer/fishModals";
import fishFilters from "../../fish/reducer/fishFilters";

const fishesReducers = combineReducers({
    fishes,
    fishModals,
    categories,
    fishFilters,
    fishAddCategoryReducer,
});

export default fishesReducers;

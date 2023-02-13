import { combineReducers } from "redux";

import profile from "../../fish/reducer/fishProfile";
import categories from "../../fish/reducer/fishCategories";
import fishes from "../../fish/reducer/fishes";
import fishesData from "../../fish/reducer/fishesData";
import fishModals from "../../fish/reducer/fishModals";
import fishFilters from "../../fish/reducer/fishFilters";

const fishesReducers = combineReducers({
    profile,
    fishes,
    fishModals,
    categories,
    fishFilters,
    fishesData,
});

export default fishesReducers;

import { combineReducers } from "redux";

import profile from "../../fish/reducer/fishProfile";
import categories from "../../fish/reducer/fishCategories";
import fishes from "../../fish/reducer/fishes";
import fishModals from "../../fish/reducer/fishModals";

const fishesReducers = combineReducers({
    profile,
    fishes,
    fishModals,
    categories,
});

export default fishesReducers;

import { combineReducers } from "redux";

import tank from "../../tank/reducer/tankFilling";

const tankReducers = combineReducers({
    tank,
});

export default tankReducers;

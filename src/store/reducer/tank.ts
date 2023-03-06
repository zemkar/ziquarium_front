import { combineReducers } from "redux";
import tankEquipment from "../../tank/reducer/tankEquipment";

import tank from "../../tank/reducer/tankFilling";

const tankReducers = combineReducers({
    tankEquipment,
    tank,
});

export default tankReducers;

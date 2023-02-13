import {
    CHANGE_EQUIPMENT, REMOVE_ALL_EQUIPMENT,
} from "../actions/types";
import { equipmentInTank } from "../interfaces";


const initialState: equipmentInTank | {} = {}


const tankEquipmentReducer = (state = initialState, action: { type: string, payload?: equipmentInTank }) => {
    const { type, payload } = action;

    console.log("tankReducer payload:", payload);
    console.log("tankReducer state:", state);


    switch (type) {

        case CHANGE_EQUIPMENT:
            return { ...state, payload };

        case REMOVE_ALL_EQUIPMENT:
            return initialState;

        default:
            return initialState;

    }
}


export default tankEquipmentReducer;
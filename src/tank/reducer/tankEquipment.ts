import {
    CHANGE_EQUIPMENT, REMOVE_ALL_EQUIPMENT, FILL_EQUIPMENT, 
} from "../actions/types";
import { equipmentInTank } from "../interfaces";


const initialState: equipmentInTank = {
    dimensions: { volume: 0, length: 0, width: 0, height: 0 },
    filter: { power: 0, type: 'none' },
    compressor: { power: 0, volume: 0 },
    light: { power: 0, lumen: 0, color: 'none' },
    heater: false}


const tankEquipmentReducer = (state = initialState, action: { type: string, payload?: equipmentInTank }) => {
    const { type, payload } = action;



    switch (type) {
        case CHANGE_EQUIPMENT:
            return { ...state, payload };

        case FILL_EQUIPMENT:
            return { ...state, ...payload };

        case REMOVE_ALL_EQUIPMENT:
            return initialState;

        default:
            return state;

    }
}


export default tankEquipmentReducer;
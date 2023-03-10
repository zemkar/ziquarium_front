import {
    CHANGE_EQUIPMENT, REMOVE_ALL_EQUIPMENT, FILL_EQUIPMENT,
} from "../actions/types";
import { equipmentInTank, compressorUsed, filterUsed, light, tankDimensions } from "../interfaces";


export const fillEquipment = (equipment: equipmentInTank) => (dispatch: any) => {
    // console.log("fillTank tankContent", equipment);
    
    dispatch({
        type: FILL_EQUIPMENT,
        payload: equipment,
    })
}

export const changeCompressorEquipment = (equipment: compressorUsed) => (dispatch: any) => {
    // console.log("change equipment", equipment)
    dispatch({
        type: CHANGE_EQUIPMENT,
        payload: {compressor: equipment},
    })
}

export const changeFilterEquipment = (equipment: filterUsed) => (dispatch: any) => {
    // console.log("change equipment", equipment)
    dispatch({
        type: CHANGE_EQUIPMENT,
        payload: {filter: equipment},
    })
}

export const changeLightEquipment = (equipment: light) => (dispatch: any) => {
    // console.log("change equipment", equipment)
    dispatch({
        type: CHANGE_EQUIPMENT,
        payload: {light: equipment},
    })
}

export const changeDimensionsEquipment = (equipment: tankDimensions) => (dispatch: any) => {
    // console.log("change equipment", equipment)
    dispatch({
        type: CHANGE_EQUIPMENT,
        payload: {dimensions: equipment},
    })
}


export const removeEquipment = (equipment: compressorUsed) => (dispatch: any) => {
    // console.log("change equipment", equipment)
    dispatch({
        type: REMOVE_ALL_EQUIPMENT,
    })
}
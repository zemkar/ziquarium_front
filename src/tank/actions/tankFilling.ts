import {
    CLEAR_TANK, FILL_TANK, 
    CHANGE_FISH_AMOUNT, REMOVE_FISH_FROM_TANK, REMOVE_ALL_FISH_FROM_TANK, 
    CHANGE_PLANT_AMOUNT, REMOVE_PLANT_FROM_TANK, REMOVE_ALL_PLANTS_FROM_TANK,
} from "./types";



export const changeFishAmount = (fishId: number, amount: number, value: number) => (dispatch: any) => {
    console.log("changeFishAmount", { id: fishId, amount: amount, value: value });

    if (amount > 0) {
        dispatch({
            type: CHANGE_FISH_AMOUNT,
            payload: { id: fishId, amount: amount, value: value | 0  }
        });
    }
    else {
        dispatch({
            type: REMOVE_FISH_FROM_TANK,
            payload: { id: fishId, amount: amount, value: value | 0  }
        });
    }
}

export const changePlantAmount = (plantId: number, amount: number, value: number) => (dispatch: any) => {
    console.log("changeFishAmount", { id: plantId, amount: amount, value: value });

    if (amount > 0) {
        dispatch({
            type: CHANGE_PLANT_AMOUNT,
            payload: { id: plantId, amount: amount, value: value | 0 }
        });
    }
    else {
        dispatch({
            type: REMOVE_PLANT_FROM_TANK,
            payload: { id: plantId, amount: amount, value: value | 0  }
        });
    }
}

export const fillTank = (tankContent: any) => (dispatch: any) => {
    console.log("fillTank tankContent", tankContent);

    dispatch({
        type: FILL_TANK,
        payload: tankContent,
    })
}

export const removeFishesFromTank = () => (dispatch: any) => {
    console.log("removeFishesFromTank");

    dispatch({
        type: REMOVE_ALL_FISH_FROM_TANK,
    })
}

export const removePlantsFromTank = () => (dispatch: any) => {
    console.log("removeFishesFromTank");

    dispatch({
        type: REMOVE_ALL_PLANTS_FROM_TANK,
    })
}

export const clearTank = () => (
    { type: CLEAR_TANK, }
)
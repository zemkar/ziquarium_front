import {
    CHANGE_FISH_AMOUNT, REMOVE_FISH_FROM_TANK, REMOVE_ALL_FISH_FROM_TANK,
    CHANGE_PLANT_AMOUNT, REMOVE_PLANT_FROM_TANK, REMOVE_ALL_PLANTS_FROM_TANK,
    CLEAR_TANK,
} from "../actions/types";
import { itemInTank, tankFiller } from "../interfaces";


const initialState:tankFiller = { fishes: [], plants:[] };


const mainTankReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;
    var fishes: itemInTank[];
    var plants: itemInTank[];
    var itemIndex: number;

    switch (type) {
        case CHANGE_FISH_AMOUNT:
            fishes = state.fishes
            itemIndex = fishes.findIndex((e:any) => 
                {return +e.id === +payload.id})
            if (itemIndex >= 0) fishes[itemIndex] = payload 
            else fishes.push(payload)
            
            return {...state, fishes};

        case REMOVE_FISH_FROM_TANK:
            fishes = state.fishes
            itemIndex = fishes.findIndex((e:any) => 
                {return +e.id === +payload.id})
            if (itemIndex >= 0) delete fishes[itemIndex]
            return {...state, fishes};

        case REMOVE_ALL_FISH_FROM_TANK:
            return {
                ...state,
                fishes: []
            };


        case CHANGE_PLANT_AMOUNT:
            plants = state.plants
            itemIndex = plants.findIndex((e:any) => 
                {return +e.id === +payload.id})
            if (itemIndex >= 0) plants[itemIndex] = payload 
            else plants.push(payload)
            return {...state, plants};

        case REMOVE_PLANT_FROM_TANK:
            plants = state.plants
            itemIndex = plants.findIndex((e:any) => 
                {return +e.id === +payload.id})
            if (itemIndex >= 0) delete plants[itemIndex]
            return {...state, plants};

        case REMOVE_ALL_PLANTS_FROM_TANK:
            return {
                ...state,
                plants: []
            };



        case CLEAR_TANK:
            return initialState;

        default:
            return initialState;
    }
}


export default mainTankReducer;

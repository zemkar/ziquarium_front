import {
  PLANTS_GET, PLANTS_CLEAR, PLANTS_REGISTER_SUCCESS, PLANTS_REGISTER_FAIL
} from "../actions/types";


const initialState = { plantList: null };


const plantListReducer = (state = initialState, action: { type: string, payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case PLANTS_GET:
      return { plantList: payload };

    case PLANTS_CLEAR:
      return { plantList: null };

    case PLANTS_REGISTER_SUCCESS:
      return { ...state, payload };

    case PLANTS_REGISTER_FAIL:
      return { ...state };

    default:
      return state;
  }
}


export default plantListReducer;

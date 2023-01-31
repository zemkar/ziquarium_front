import {SET_USER_PROFILE, CLEAR_USER_PROFILE} from "../actions/types";
  
var profile: any = localStorage.getItem("profile")
if (profile) {
  profile = JSON.parse(profile);
}

const initialState = profile ? {profile: profile} : {profile: null};


const profileReducer = (state = initialState, action:{type:string, payload?:any}) => {
    const { type, payload } = action;
  
    switch (type) {
      case SET_USER_PROFILE:
        return { profile: payload };

      case CLEAR_USER_PROFILE:
        return { profile: null };
        
      default:
        return state;
    }
  }
  
  
  export default profileReducer;
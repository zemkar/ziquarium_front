import axios from "axios";
import Z_URL from "../../service/constants";
import authHeader from "../../auth/service/authHeader";
import { userProfile } from "../interface";


const getProfile = () => {
  var user:any = localStorage.getItem('user')
  var accessToken: string | null = localStorage.getItem('access')
  if (user && accessToken) { 
    user = JSON.parse(user) 
    console.log('getProfile - user', user);
    return axios.get(Z_URL.USER_PROFILE, { headers: authHeader(accessToken) });
  }
  else { return Promise.reject("No user logged in"); }
}


const modProfile = (userData:userProfile) => {
    console.log("userService - modProfile | got userData: \n", userData);
    
  var user:any = localStorage.getItem('user')
  var accessToken: string | null = localStorage.getItem('access')
  if (user && accessToken) { 
    user = JSON.parse(user) 
    console.log('modProfile - user', user);
    return axios.put(Z_URL.USER_PROFILE, userData, { headers: authHeader(accessToken) })
    .then((res:any) => {
        console.log("userService - modProfile | response: \n", res);
        return res;
    })
    .catch((err:any) => {
        console.log("userService - modProfile | response error: \n", err);
    });
  }
  else { throw new Error("No user logged in"); }
}

const deleteUser = () => {
    var user:any = localStorage.getItem('user')
    var accessToken: string | null = localStorage.getItem('access')
    if (user && accessToken) { 
      user = JSON.parse(user) 
      console.log('getUser - user', user);
      return axios.delete(Z_URL.USER_PROFILE, { headers: authHeader(accessToken) });
    }
    else { return Promise.reject("No user logged in"); }
}

const userService = {
  getProfile,
  modProfile,
  deleteUser,
};

export default userService;
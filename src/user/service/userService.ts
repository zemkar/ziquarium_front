import axios from "axios";
import Z_URL from "../../service/constants";
import authHeader from "../../auth/service/authHeader";
import { userProfile } from "../interface";


const getProfile = () => {
  var user: any = localStorage.getItem('user')
  var accessToken: string | null = localStorage.getItem('access')
  if (user && accessToken) {
    user = JSON.parse(user)
    // console.log('getProfile - user', user);
    return axios.get(Z_URL.USER_PROFILE, { headers: authHeader(accessToken) });
  }
  else { return Promise.reject("No user logged in"); }
}


const modProfile = async (userData: userProfile) => {
  // console.log("userService - modProfile | got userData: \n", userData);

  var user: any = localStorage.getItem('user')
  var accessToken: string | null = localStorage.getItem('access')
  if (user && accessToken) {
    user = JSON.parse(user)
    // console.log('modProfile - user', user);
    try {
      const res = await axios.put(Z_URL.USER_PROFILE, userData, { headers: authHeader(accessToken) });
      // console.log("userService - modProfile | response: \n", res);
      return res;
    } catch (err) {
      // console.log("userService - modProfile | response error: \n", err);
    }
  }
  else { throw new Error("No user logged in"); }
}

const deleteUser = () => {
  var user: any = localStorage.getItem('user')
  var accessToken: string | null = localStorage.getItem('access')
  if (user && accessToken) {
    user = JSON.parse(user)
    // console.log('getUser - user', user);
    return axios.delete(Z_URL.USER_PROFILE, { headers: authHeader(accessToken) });
  }
  else { return Promise.reject("No user logged in"); }
}

const deleteUserOrder = (id:number) => {
  var user: any = localStorage.getItem('user')
  var accessToken: string | null = localStorage.getItem('access')
  if (user && accessToken) {
    user = JSON.parse(user)
    // console.log('getUser - user', user);
    return axios.delete(Z_URL.ORDER + id +"/", { headers: authHeader(accessToken) })
  } else {
    return axios.delete(Z_URL.ORDER + id +"/")
  }
}

// Debug function
const usersList = () => {
  var user: any = localStorage.getItem('user')
  var accessToken: string | null = localStorage.getItem('access')
  if (user && accessToken) {
    user = JSON.parse(user)
    // console.log('getUser - user', user);
    return axios.get(Z_URL.USERS, { headers: authHeader(accessToken) })
  }
  else { return Promise.reject("No user logged in"); }
}
const userService = {
  usersList,
  getProfile,
  modProfile,
  deleteUser,
  deleteUserOrder,
};

export default userService;
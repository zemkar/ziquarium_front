import axios from "axios";
import jwt from "jwt-decode";
import Z_URL from "../../service/constants";
import { decodedAccess, userRegistrationData, userTokens } from "../interfaces";
import authHeader from "./authHeader";

const register = (regData: userRegistrationData) => {
  console.log("Send register data:", regData);

  return axios.post(Z_URL.REGISTRATION, regData);
};

const login = async (username: string, password: string) => {
  const response = await axios
    .post(Z_URL.LOGIN, {
      username,
      password,
    })
    .then((res:any)=>{
      console.log("authService - login \n", res);
      return res},
      (err:any)=>{
        console.log("authService - login \n", err);
        return err});
  console.log("authService - login \n", response.data);
  var user = loggedUserStore(response.data);
  console.log("User to store", user);
  return user;
};

const logout = async (userTokens: userTokens) => {
  console.log("authService - logout\n");
  try {
    const res = await axios
      .post(Z_URL.LOGOUT, { 'refresh': userTokens.refresh }, {
        headers: authHeader(userTokens.access),
      });
    console.log("authService - logout success\n", res);
  } catch (res_1) {
    console.log("authService - logout error\n", res_1);
  }
}

const refresh = async (userTokens: userTokens) => {
  console.log("can try refresh");
  const response = await axios
    .post(Z_URL.REFRESH_TOKEN, { "refresh": userTokens.refresh });
  console.log("authService - refresh \n", response.data);
  userTokens.access = response.data.access;
  localStorage.setItem("access", userTokens?.access);
  return userTokens;
}

const loggedUserStore = (userTokens: userTokens) => {
  console.log("authService - loggedUser Store\n");
  localStorage.setItem("access", userTokens?.access);
  localStorage.setItem("refresh", userTokens?.refresh);


  var decodedToken: decodedAccess = jwt(userTokens.access)
  var loggedUser = { 
    id: decodedToken.user_id, 
    name: decodedToken.name, 
    editor: decodedToken.editor, 
    exp: decodedToken.exp, 
    admin: decodedToken.admin }
  localStorage.setItem("user", JSON.stringify(loggedUser));
  return loggedUser
}

const loggedUserRemove = () => {
  console.log("authService - loggedUser Remove\n");
  localStorage.removeItem("refresh");
  localStorage.removeItem("access");
  localStorage.removeItem("user");
}


const authService = {
  register,
  login,
  logout,
  refresh,
  loggedUserStore,
  loggedUserRemove,
};

export default authService;
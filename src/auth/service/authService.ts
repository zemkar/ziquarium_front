import axios from "axios";
import jwt from "jwt-decode";
import Z_URL from "../../service/constants";
import { decodedAccess, userRegistrationData, userTokens } from "../interfaces";
import authHeader from "./authHeader";

const register = (regData: userRegistrationData) => {
  console.log("Send register data:", regData);

  return axios.post(Z_URL.REGISTER, regData);
};

const login = (username: string, password: string) => {
  return axios
    .post(Z_URL.LOGIN, {
      username,
      password,
    })
    .then((response) => {
      console.log("authService - login \n", response);
      return response.data;
    });
};

const logout = (userTokens:userTokens) => {
  console.log("authService - logout\n");
  return axios
    .post(Z_URL.LOGOUT, { 'refresh': userTokens.refresh }, {
      headers: authHeader(userTokens.access),
    })
    .then((res) => { console.log("authService - logout success\n", res); })
    .catch((res) => { console.log("authService - logout error\n", res); })
}

const refresh = (userTokens:userTokens) => {
  console.log("can try refresh");
  return axios
    .post(Z_URL.REFRESH_TOKEN, { "refresh": userTokens.refresh })
    .then((response) => {
      console.log("authService - refresh \n", response.data);
      userTokens.access = response.data.access
      return userTokens;
    });
}

const loggedUserStore = (userTokens:userTokens) => {
  console.log("authService - loggedUser Store\n");
  localStorage.setItem("access", userTokens?.access);
  localStorage.setItem("refresh", userTokens?.refresh);
  
  
  var decodedToken: decodedAccess = jwt(userTokens.access)
  var loggedUser = { id: decodedToken.user_id, name: decodedToken.name, editor: decodedToken.editor, exp: decodedToken.exp }
  localStorage.setItem("user", JSON.stringify(loggedUser));

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
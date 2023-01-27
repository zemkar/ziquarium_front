

const SERVER =  process.env.REACT_APP_URL ? process.env.REACT_APP_URL : "http://127.0.0.1:8000/";
// : "https://ziquarium.onrender.com/api";
// : "http://localhost:8000/";
// : "http://192.168.1.123:8000";

const LOGIN = `${SERVER}api/login/`;
const LOGOUT = `${SERVER}api/logout/`;
const REGISTER = `${SERVER}api/register/`;
const REFRESH_TOKEN = `${SERVER}api/token/refresh/`;      // refresh access token

const FISH = `${SERVER}api/fishes/`;
const FISH_PROFILE = `${SERVER}api/fishes-data/`;
const FISH_CATEGORY = `${SERVER}api/fish_category/`;


const USERS = `${SERVER}api/users/`;               // users list
const PROFILES = `${SERVER}api/users-profiles/`;   // profiles list


const PROTECTED_PAGE = `${SERVER}protected/`

const Z_URL = {
    SERVER,
    LOGIN, LOGOUT, REGISTER, REFRESH_TOKEN,
    FISH, FISH_PROFILE, FISH_CATEGORY,
    USERS, PROFILES,
    PROTECTED_PAGE,

};

export const ALERT_TIMEOUT = 5000; // 5 sec
export default Z_URL;
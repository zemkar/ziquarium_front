

const SERVER =  process.env.REACT_APP_URL ? process.env.REACT_APP_URL : "http://127.0.0.1:8000";
// : "https://ziquarium.onrender.com/api";
// : "http://localhost:8000/";
// : "http://192.168.1.123:8000";

const LOGIN = `${SERVER}/api/login/`;
const LOGOUT = `${SERVER}/api/logout/`;
const REGISTRATION = `${SERVER}/api/registration/`;
const REFRESH_TOKEN = `${SERVER}/api/token/refresh/`;      // refresh access token

const FISH = `${SERVER}/api/fishes/`;
const FISH_DATA = `${SERVER}/api/fishes-data/`;
const FISH_PROFILE = `${SERVER}/api/fish/`;
const FISH_CATEGORY = `${SERVER}/api/fish-category/`;


const PLANTS = `${SERVER}/api/plants/`;
const PLANTS_DATA = `${SERVER}/api/plants-data/`;
const PLANT_PROFILE = `${SERVER}/api/plant/`;
const PLANTS_CATEGORY = `${SERVER}/api/plants-category/`;

const SHOP_DATA= `${SERVER}/api/sell-data/`;

const USERS = `${SERVER}/api/users/`;               // users list for admins
const PROFILES = `${SERVER}/api/users-profiles/`;   // profiles list for admins

const USER_PROFILE = `${SERVER}/api/user/`;         // user profile

const PROTECTED_PAGE = `${SERVER}/protected/`

const ORDER = `${SERVER}/api/orders/`

const Z_URL = {
    SERVER,
    LOGIN, LOGOUT, REGISTRATION, REFRESH_TOKEN,
    FISH, FISH_DATA, FISH_PROFILE, FISH_CATEGORY,
    PLANTS, PLANTS_DATA, PLANT_PROFILE, PLANTS_CATEGORY,
    SHOP_DATA,
    USERS, PROFILES, USER_PROFILE,
    PROTECTED_PAGE,
    ORDER,
};

export const ALERT_TIMEOUT = 5000; // 5 sec
export default Z_URL;
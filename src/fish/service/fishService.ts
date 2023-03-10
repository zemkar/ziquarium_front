import axios from "axios";
import Z_URL from "../../service/constants";
import authHeader from "../../auth/service/authHeader";
import { fish, fishCategory } from "../interfaces";


const getFishes = () => {
    
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("fishService - getFishes for user");
        return axios.get(Z_URL.FISH, { headers: authHeader(accessToken) })
    }
    // console.log("fishService - getFishes for anonymous");
    return axios.get(Z_URL.FISH);
}

const getFishesCategories = () => {
    return axios.get(Z_URL.FISH_CATEGORY);
}



const addFish = (fishData: fish) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("fishService - addFish", fishData);
        return axios.post(Z_URL.FISH, fishData, { headers: {"Content-Type": "multipart/form-data" ,Authorization: "Bearer " + accessToken}  })
    }
}

const addFishCategory = (name: string) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("fishService - addFishCategory", name);
        return axios.post(Z_URL.FISH_CATEGORY, {name: name}, { headers: authHeader(accessToken) })
    }
}


const modFish = (fishData: fish) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.put(Z_URL.FISH + fishData.id + "/", fishData, { headers: authHeader(accessToken) })
    }
}

const modFishCategories = (categoriesData: fishCategory) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.put(Z_URL.FISH_CATEGORY + categoriesData.id + "/", categoriesData, { headers: authHeader(accessToken) })
    }
}

const delFish = (id: number) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.delete(Z_URL.FISH + id + "/", { headers: authHeader(accessToken) })
    }
}

const delFishCategories = (id: number) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.delete(Z_URL.FISH_CATEGORY + id + "/", { headers: authHeader(accessToken) })
    }
}



const fishService = {
    getFishes,
    getFishesCategories,
    addFish,
    addFishCategory,
    modFish,
    modFishCategories,
    delFish,
    delFishCategories,
}

export default fishService;
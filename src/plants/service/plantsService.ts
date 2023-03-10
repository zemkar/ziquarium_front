import axios from "axios";
import Z_URL from "../../service/constants";
import authHeader from "../../auth/service/authHeader";
import { plantData, plantCategory } from "../interfaces";


const getPlants = () => {
    
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("plantService - getPlants for user");
        return axios.get(Z_URL.PLANTS, { headers: authHeader(accessToken) })
    }

    // console.log("plantService - getPlants for anonymous");
    return axios.get(Z_URL.PLANTS);
}


const getPlantsCategories = () => {
    return axios.get(Z_URL.PLANTS_CATEGORY);
}



const addPlant = (plantData: plantData) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("plantService - addPlant", plantData);
        return axios.post(Z_URL.PLANTS, plantData, { headers: {"Content-Type": "multipart/form-data" ,Authorization: "Bearer " + accessToken}  })
    }
}

const addPlantsCategory = (name: string) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("plantService - addPlantCategory", name);
        return axios.post(Z_URL.PLANTS_CATEGORY, {name: name}, { headers: authHeader(accessToken) })
    }
}


const modPlant = (plantData: plantData) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.put(Z_URL.PLANTS + plantData.id + "/", plantData, { headers: authHeader(accessToken) })
    }
}


const modPlantsCategory = (categoriesData: plantCategory) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.put(Z_URL.PLANTS_CATEGORY + categoriesData.id + "/", categoriesData, { headers: authHeader(accessToken) })
    }
}

const delPlant = (id: number) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.delete(Z_URL.PLANTS + id + "/", { headers: authHeader(accessToken) })
    }
}

const delPlantsCategory = (id: number) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.delete(Z_URL.PLANTS_CATEGORY + id + "/", { headers: authHeader(accessToken) })
    }
}



const plantsService = {
    getPlants,
    getPlantsCategories,
    addPlant,
    addPlantsCategory,
    modPlant,
    modPlantsCategory,
    delPlant,
    delPlantsCategory,
}

export default plantsService;
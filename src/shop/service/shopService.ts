import axios from "axios";
import Z_URL from "../../service/constants";
import authHeader from "../../auth/service/authHeader";



const getShopItemsData = () => {
    
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        console.log("shopService - getShopItemsData for user");
        return axios.get(Z_URL.SHOP_DATA, { headers: authHeader(accessToken) })
    }

    console.log("shopService - getShopItemsData for anonymous");
    return axios.get(Z_URL.SHOP_DATA);
}

const modShopItemData = (data:any) => {
    
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        console.log("shopService - getShopItemsData for user");
        return axios.put(Z_URL.SHOP_DATA + data?.shop_item + "/", data, { headers: authHeader(accessToken) })
    }
    return axios.put(Z_URL.SHOP_DATA);
}

const createOrder = (order:any) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        console.log("shopService - post Order");
        return axios.post(Z_URL.ORDER, order, { headers: authHeader(accessToken) })
    }
    return axios.post(Z_URL.ORDER)
}

const shopService = {
    getShopItemsData,
    modShopItemData,
    createOrder,
}

export default shopService;
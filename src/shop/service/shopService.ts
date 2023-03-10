import axios from "axios";
import Z_URL from "../../service/constants";
import authHeader from "../../auth/service/authHeader";



const getShopItemsData = () => {
    
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("shopService - getShopItemsData for user");
        return axios.get(Z_URL.SHOP_DATA, { headers: authHeader(accessToken) })
    }

    // console.log("shopService - getShopItemsData for anonymous");
    return axios.get(Z_URL.SHOP_DATA);
}

const modShopItemData = (data:any) => {
    
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("shopService - getShopItemsData for user");
        return axios.put(Z_URL.SHOP_DATA + data?.shop_item + "/", data, { headers: authHeader(accessToken) })
    }
    return axios.put(Z_URL.SHOP_DATA);
}

const createOrder = (order:any) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("shopService - post Order");
        return axios.post(Z_URL.ORDER, order, { headers: authHeader(accessToken) })
    }
    return axios.post(Z_URL.ORDER)
}

const payment = (orderId: number) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("shopService - post Order");
        return axios.post(Z_URL.PAYMENT, orderId, { headers: authHeader(accessToken) })
    }
    return axios.post(Z_URL.PAYMENT)
}

const checkout = (orderId: number) => {
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        return axios.post(Z_URL.CHECKOUT+orderId+"/", "", { headers: authHeader(accessToken) })
    }
    return axios.post(Z_URL.CHECKOUT)
}

const getOrders = () => {
    
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("shopService - getOrders for user");
        return axios.get(Z_URL.ORDER, { headers: authHeader(accessToken) })
    }

    // console.log("shopService - getOrders for anonymous");
    return axios.get(Z_URL.ORDER);
}
const getUserPayments = () => {
    
    var accessToken: string | null = localStorage.getItem('access')
    if (accessToken) {
        // console.log("shopService - getOrders for user");
        return axios.get(Z_URL.PAYMENT, { headers: authHeader(accessToken) })
    }

    // console.log("shopService - getOrders for anonymous");
    return axios.get(Z_URL.PAYMENT);
}


export const formatPrice = (price: number) => {
    // console.log(price);
    
    return `${(price / 100).toFixed(2)}`;
  };

const shopService = {
    getShopItemsData,
    modShopItemData,
    createOrder,
    payment,
    checkout,
    getOrders,
    getUserPayments,
}

export default shopService;
import axios from "axios";

const BASE_URL = process.env.API_GATEWAY_BASE_URL;

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
})

//to work with interceptors
export const axiosWithAuth=axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
})
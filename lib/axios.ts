import axios from "axios";

const BASE_URL = process.env.API_GATEWAY_BASE_URL;

export default axios.create({
    baseURL: "http://localhost:8222",
    headers: {
        "Content-type": "application/json"
    }
})

//to work with interceptors
export const axiosWithAuth=axios.create({
    baseURL: "http://localhost:8222",
    headers: {
        "Content-type": "application/json"
    }
})
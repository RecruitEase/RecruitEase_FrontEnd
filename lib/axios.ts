import axios from "axios";

const BASE_URL = 'http://35.202.30.82:8222/';

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
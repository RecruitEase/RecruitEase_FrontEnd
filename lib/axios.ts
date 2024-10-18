import axios from "axios";
import https from "node:https";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL+'/';
const agent = new https.Agent({//authorize self signed cert for now
    rejectUnauthorized:false
});

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    },
    httpsAgent:agent
})


//to work with interceptors
export const axiosWithAuth=axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    },
    httpsAgent:agent
})

import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {axiosWithAuth} from "@/lib/axios";


//interceptor to arrach authorization header
const useAxiosAuth=()=>{
    const {data:session}=useSession();

    useEffect(()=>{
        // console.log("cdcsdescsdcscsxds")
        const requestIntercept=axiosWithAuth.interceptors.request.use((config)=>{
                config.headers["Authorization"]=`Bearer ${session?.user.accessToken}`;
            return config;
        })

        return ()=>{
            axiosWithAuth.interceptors.request.eject(requestIntercept);
        }
    },[session])

    return axiosWithAuth;
}

export default useAxiosAuth;
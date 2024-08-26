import axios from "axios";

import {getSession} from "next-auth/react";
import {Session} from "next-auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance=axios.create({baseURL:BASE_URL});


let sessionPromise: Promise<Session |null> | null = null;

axiosInstance.interceptors.request.use(async (config) => {
    if (!sessionPromise) {
        sessionPromise = getSession();
    }
    const session = await sessionPromise;

    if (session && session.user.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


// user detail apis.............................................................................................................................................................................
export const getUsers=async (recruiterIds:string[],adminIds:string[],moderatorIds:string[],candidateIds:string[])=>{
    return (await axiosInstance.post(`user/detail-list`,
        {
            recruiterIdList:recruiterIds,
            adminIdList:adminIds,
            moderatorIdList:moderatorIds,
            candidateIdList:candidateIds

        })).data.content;
}
export const getRecruiters=async (recruiterIds:string[])=>{
    return (await axiosInstance.post(`user/recruiter-list`,{recruiterIdList:recruiterIds})).data.content.recruiterList;
}
export const getAdmins=async (adminIds:string[])=>{
    return (await axiosInstance.post(`user/admin-list`,{adminIdList:adminIds})).data.content.adminIdList;
}
export const getModerators=async (moderatorIds:string[])=>{
    return (await axiosInstance.post(`user/moderator-list`,{moderatorIdList:moderatorIds})).data.content.moderatorIdList;
}
export const getCandidates=async (candidateIds:string[])=>{
    return (await axiosInstance.post(`user/candidate-list`,{candidateIdList:candidateIds})).data.content.candidateIdList;
}


// application detail apis.............................................................................................................................................................................
export const getApplications=async (candidateId:string)=>{
    return (await axiosInstance.get(`api/v1/applications/candidate/${candidateId}`)).data.content;
}
export const getApplication=async (applicationId:string)=>{
    return (await axiosInstance.get(`api/v1/applications/view/${applicationId}`)).data.content;
}

// export const getTodosIds= async()=>{
//     return (await axiosInstance.get<Todo[]>('todos')).data.map(todo=>todo.id);
// }
//
// export const getTodo=async (id:number)=>{
//     return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
// }
//
// export const createTodo=async (data:Todo)=>{
//     (await axiosInstance.post('todos',data));
// }
//
// export const updateTodo=async (data:Todo)=>{
//     (await axiosInstance.put(`todos/${data.id}`,data));
// }
//
// export const deleteTodo=async (id:number)=>{
//     (await axiosInstance.delete(`todos/${id}`));
// }
//
//
// export const getProjects=async (page=1)=>{
//     return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`)).data;
// }
//
// export const getProducts=async ({pageParam}:{pageParam:number})=>{
//     return (await axiosInstance.get<Product[]>(`products?_page=${pageParam+1}&_limit=3`)).data;
// }
//
// export const getProduct=async (id:number)=>{
//     return (await axiosInstance.get<Product>(`products/${id}`)).data;
// }
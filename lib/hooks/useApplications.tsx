import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import {getApplication, getApplications} from "@/lib/api";
import {ApplicationProp} from "@/types/applications";

export function useApplications(candidateId: string) {
    return useQuery<ApplicationProp[]>({
        queryKey:['applications'],
        queryFn:()=>getApplications(candidateId),
    })
}

export function useApplication(applicationId: string|null) {
    const queryClient=useQueryClient();

    return useQuery<ApplicationProp>({
        queryKey:['application',applicationId],
        queryFn:()=>getApplication(applicationId!),
        enabled:!!applicationId,
        placeholderData:()=>{

            const cachedApplications:(ApplicationProp[]|undefined)=
                queryClient.getQueryData(['applications'])
            
            if(cachedApplications){
                return cachedApplications.find((application)=>application.applicationId==applicationId);
            }

        }
    })
}
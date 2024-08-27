import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, QueryClient, useQueryClient, useMutation } from '@tanstack/react-query';
import {getApplication, getApplications, withdrawApplication} from "@/lib/api";
import {ApplicationProp} from "@/types/applications";
import { Bounce, toast } from "react-toastify";

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


// mutations...................................

export function useWithdrawApplication(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(applicationId:string)=>withdrawApplication(applicationId),
        onSettled:async (data,error,variables)=> {
            //data : output on sucess
            //error : output on error
            //variables : input data
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({queryKey: ['applications']})
                await queryClient.invalidateQueries({queryKey: ["application", variables],
                })
            }
        },
        onSuccess:()=>{
            toast.success("Withdrawn successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
        },
        onError:()=>{
            toast.error("Withdrawal failed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
        }
    })

}
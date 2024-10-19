import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, QueryClient, useQueryClient, useMutation } from '@tanstack/react-query';
import {
    createApplication,
    getApplication,
    getApplications,
    getApplicationsByJobId,
    withdrawApplication
} from "@/lib/api";
import {ApplicationProp} from "@/types/applications";
import { Bounce, toast } from "react-toastify";
import {useRouter} from "next/navigation";


export function useApplications(candidateId: string) {
    return useQuery<ApplicationProp[]>({
        queryKey:['applications'],
        queryFn:()=>getApplications(candidateId),
    })
}

export function useApplicationsByJob(jobId: string) {
    return useQuery<ApplicationProp[]>({
        queryKey:['applications-job',jobId],
        queryFn:()=>getApplicationsByJobId(jobId),
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

export function useCreateApplication(){

    const queryClient=useQueryClient();
    const router=useRouter();

    return useMutation({
        mutationFn:(data:ApplicationProp)=> createApplication(data),
        onSettled:async (data,error,variables)=>{//what to run after the mutation whether its a sucess or error
            //data : output on sucess
            //error : output on error
            //variables : input data


        },
        onSuccess:()=>{
            toast.success("Application submitted successfully!", {
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
            router.push('/candidate/applications');
        },
        onError:(error)=>{
            let msg=error['response'].data.errors.application || "Error Occurred!"
            console.log("msg",msg)
            toast.error( msg, {
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
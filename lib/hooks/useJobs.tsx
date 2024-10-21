import {useMutation, useQueries, useQuery, useQueryClient} from '@tanstack/react-query';
import {
    createJob, getAllLiveJobs,
    getJobById,
    getJobsByLoggedRecruiter,
    updateJob,
} from "@/lib/api";
import { Job } from '@/types/job';
import {useRouter} from "next/navigation";
import {Bounce, toast} from "react-toastify";

export function useLiveJobs() {
    return useQuery<Job[]>({
        queryKey:['jobs'],
        refetchOnWindowFocus:false,
        queryFn:()=>getAllLiveJobs(),
    })
}

export function useJobs(jobIds:(string | undefined)[]|undefined){
    return useQueries({
        queries:(jobIds??[]).map((jobId)=>{
            return{
                queryKey:['job', jobId],
                queryFn:()=>getJobById(jobId!),
            }
        })
    })
}

export function useJobsByLoggedRecruiter() {
    return useQuery<Job[]>({
        queryKey:['myjobs'],
        queryFn:()=>getJobsByLoggedRecruiter(),
    })
}

export function useJob(jobId: string|undefined) {
    const queryClient=useQueryClient();
    return useQuery<Job>({
        queryKey:['job',jobId],
        queryFn:()=>getJobById(jobId!),
        enabled:!!jobId,

    })
}

//mutations.............................
export function useCreateJob(){

    const queryClient=useQueryClient();
    const router=useRouter();

    return useMutation({
        mutationFn:(data:Job)=> createJob(data),
        onSettled:async (data,error,variables)=>{//what to run after the mutation whether its a sucess or error
            //data : output on sucess
            //error : output on error
            //variables : input data


        },
        onSuccess:()=>{
            toast.success("Job created successfully!", {
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
            router.push('/recruiter/vacancy');
        },
        onError:(error)=>{
            let msg="Error Occurred!"
            console.log("err msg",msg)
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


export function useUpdateJobMutation(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(updateReq:Job)=>updateJob(updateReq),
        onSettled:async (data,error,variables)=> {
            //data : output on sucess
            //error : output on error
            //variables : input data
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({queryKey: ['myjobs']})
                await queryClient.invalidateQueries({queryKey: ["jobs", variables.jobId],
                })
            }
        },
        onSuccess:()=>{
            toast.success("Updated successfully!", {
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
            toast.error("Error Occurred!", {
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



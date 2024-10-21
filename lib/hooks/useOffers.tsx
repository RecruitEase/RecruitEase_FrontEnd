import {useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Bounce, toast } from "react-toastify";
import {useRouter} from "next/navigation";
import {OfferCreationProps, OfferProps, OfferUpdateQueryProps} from '@/types/offers';
import {Job} from "@/types/job";
import {
    createOffer,
    getOfferById,
    getOffersByCandidate,
    getOffersByJob,
    getOffersByRecruiter,
    updateOffer
} from "@/lib/api";


export function useOffersByCandidate(candidateId: string) {
    return useQuery<OfferProps[]>({
        queryKey:['offers-candidate',candidateId],
        queryFn:()=>getOffersByCandidate(candidateId),
    })
}

export function useOffersByRecruiter(recruiterId: string) {
    return useQuery<OfferProps[]>({
        queryKey:['offers-recruiter',recruiterId],
        queryFn:()=>getOffersByRecruiter(recruiterId),
    })
}

export function useOffersByJob(jobId: string) {
    return useQuery<OfferProps[]>({
        queryKey:['offers-job',jobId],
        queryFn:()=>getOffersByJob(jobId),
    })
}

export function useOffer(offerId: string) {
    return useQuery<Job>({
        queryKey:['offer',offerId],
        queryFn:()=>getOfferById(offerId!),
    })
}


// mutations...................................

export function useCreateOffer(){

    const queryClient=useQueryClient();
    const router=useRouter();

    return useMutation({
        mutationFn:(data:OfferCreationProps)=> createOffer(data),
        onSettled:async (data,error,variables)=>{//what to run after the mutation whether its a sucess or error
            //data : output on sucess
            //error : output on error
            //variables : input data


        },
        onSuccess:()=>{
            toast.success("Offer created successfully!", {
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
            router.push('/recruiter/joboffers');
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


export function useUpdateOfferMutation(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(req:OfferUpdateQueryProps)=>updateOffer(req.updateReq),
        onSettled:async (data,error,variables)=> {
            //data : output on sucess
            //error : output on error
            //variables : input data
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({queryKey: ['offers-candidate',variables.candidateId]})
                await queryClient.invalidateQueries({queryKey: ['offers-recruiter',variables.recruiterId]})
                await queryClient.invalidateQueries({queryKey: ["offer", variables.updateReq.offerId],
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
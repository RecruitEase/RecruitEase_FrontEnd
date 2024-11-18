import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCandidate, getCandidates, updateCandidate, updateJob} from "@/lib/api";
import {CandidateProp, CandidateUpdateProp, CandidateUpdateReqProp} from "@/types/users";
import {Job} from "@/types/job";
import {Bounce, toast} from "react-toastify";

export function useCandidates(candidateIds:string[]) {

    return useQuery<CandidateProp[]>({
        queryKey:['candidates'],
        queryFn:()=>getCandidates(candidateIds),
        enabled: candidateIds.length > 0
    })
}

export function useCandidate(candidateId: string|undefined) {
    const queryClient=useQueryClient();

    return useQuery<CandidateProp>({
        queryKey:['candidate',candidateId],
        queryFn:()=>getCandidate(candidateId!),
        enabled:!!candidateId,
        placeholderData:()=>{

            const cachedcandidates:(CandidateProp[]|undefined)=
                queryClient.getQueryData(['candidates'])
            
            if(cachedcandidates){
                return cachedcandidates.find((candidate)=>candidate.candidateId==candidateId);
            }

        }
    })
}


export function useUpdateCandidate(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(updateReq:CandidateUpdateReqProp)=>updateCandidate(updateReq.req),
        onSettled:async (data,error,variables)=> {
            //data : output on sucess
            //error : output on error
            //variables : input data
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({queryKey: ['candidate',variables.candidateId]})

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


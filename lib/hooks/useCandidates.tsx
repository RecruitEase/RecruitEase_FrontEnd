import { useQuery, useQueryClient} from '@tanstack/react-query';
import {getCandidate, getCandidates} from "@/lib/api";
import {CandidateProp} from "@/types/users";

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
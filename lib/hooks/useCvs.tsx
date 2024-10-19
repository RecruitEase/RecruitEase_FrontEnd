import {useQuery, useQueryClient } from "@tanstack/react-query";
import {CVProps} from "@/types";
import {getCvById, getCvsByCandidateId} from "@/lib/api";


export function useCvByCandidateId(candidateId:string) {
    return useQuery<CVProps[]>({
        queryKey:['mycvs'],
        queryFn:()=>getCvsByCandidateId(candidateId),
    })
}

export function useCv(cvId: string) {
    const queryClient=useQueryClient();
    return useQuery<CVProps>({
        queryKey:['cv',cvId],
        queryFn:()=>getCvById(cvId!),
    })
}



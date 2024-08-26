import { useQuery, useQueryClient} from '@tanstack/react-query';
import {getRecruiter, getRecruiters} from "@/lib/api";
import {RecruiterProp} from "@/types/users";

export function useRecruiters(recruiterIds:string[]) {

    return useQuery<RecruiterProp[]>({
        queryKey:['recruiters'],
        queryFn:()=>getRecruiters(recruiterIds),
        enabled: recruiterIds.length > 0
    })
}

export function useRecruiter(recruiterId: string|undefined) {
    const queryClient=useQueryClient();

    return useQuery<RecruiterProp>({
        queryKey:['recruiter',recruiterId],
        queryFn:()=>getRecruiter(recruiterId!),
        enabled:!!recruiterId,
        placeholderData:()=>{

            const cachedRecruiters:(RecruiterProp[]|undefined)=
                queryClient.getQueryData(['recruiters'])
            
            if(cachedRecruiters){
                return cachedRecruiters.find((recruiter)=>recruiter.recruiterId==recruiterId);
            }

        }
    })
}
import { useQuery} from '@tanstack/react-query';
import {getRecruiters} from "@/lib/api";
import {RecruiterProp} from "@/types/users";

export function useRecruiters(recruiterIds:string[]) {

    return useQuery<RecruiterProp[]>({
        queryKey:['recruiters'],
        queryFn:()=>getRecruiters(recruiterIds),
        enabled: recruiterIds.length > 0
    })
}
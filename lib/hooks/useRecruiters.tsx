import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import {getApplications, getRecruiters} from "@/lib/api";
import {RecruiterProp} from "@/types/users";

export function useRecruiters(recruiterIds:string[]) {

    return useQuery<RecruiterProp[]>({
        queryKey:['recruiters'],
        queryFn:()=>getRecruiters(recruiterIds),
        enabled: recruiterIds.length > 0
    })
}
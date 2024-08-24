import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import {getApplications} from "@/lib/api";
import {ApplicationProp} from "@/types/applications";

export function useApplications(candidateId: string) {
    return useQuery<ApplicationProp[]>({
        queryKey:['applications'],
        queryFn:()=>getApplications(candidateId)
    })
}
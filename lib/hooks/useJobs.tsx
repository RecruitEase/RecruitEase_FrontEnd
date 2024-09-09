import { useQuery, useQueryClient} from '@tanstack/react-query';
import {getJobs} from "@/lib/api";
import { Job } from '@/types/job';


export function useAllJobs() {
    return useQuery<Job[], Error>({
        queryKey:['jobs'],
        queryFn:()=>getJobs(),
    })
    }

    
    

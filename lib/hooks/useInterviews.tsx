import {InterviewProp} from "@/types/interviews";
import {getApplications, getInterviews} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";

export function useInterviews() {
    return  useQuery<InterviewProp[]>({
        queryKey:['interviews'],
        queryFn:()=>getInterviews(),
    })
}
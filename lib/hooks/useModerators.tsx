import { useQuery, useQueryClient} from '@tanstack/react-query';
import {getModerator, getModerators} from "@/lib/api";
import {ModeratorProp} from "@/types/users";

export function useModerators(moderatorIds:string[]) {

    return useQuery<ModeratorProp[]>({
        queryKey:['moderators'],
        queryFn:()=>getModerators(moderatorIds),
        enabled: moderatorIds.length > 0
    })
}

export function useModerator(moderatorId: string|undefined) {
    const queryClient=useQueryClient();

    return useQuery<ModeratorProp>({
        queryKey:['moderator',moderatorId],
        queryFn:()=>getModerator(moderatorId!),
        enabled:!!moderatorId,
        placeholderData:()=>{

            const cachedModerators:(ModeratorProp[]|undefined)=
                queryClient.getQueryData(['moderators'])
            
            if(cachedModerators){
                return cachedModerators.find((moderator)=>moderator.moderatorId==moderatorId);
            }

        }
    })
}
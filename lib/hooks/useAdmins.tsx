import { useQuery, useQueryClient} from '@tanstack/react-query';
import {getAdmin, getAdmins} from "@/lib/api";
import {AdminProp} from "@/types/users";

export function useAdmins(adminIds:string[]) {

    return useQuery<AdminProp[]>({
        queryKey:['admins'],
        queryFn:()=>getAdmins(adminIds),
        enabled: adminIds.length > 0
    })
}

export function useAdmin(adminId: string|undefined) {
    const queryClient=useQueryClient();

    return useQuery<AdminProp>({
        queryKey:['admin',adminId],
        queryFn:()=>getAdmin(adminId!),
        enabled:!!adminId,
        placeholderData:()=>{

            const cachedAdmins:(AdminProp[]|undefined)=
                queryClient.getQueryData(['admins'])
            
            if(cachedAdmins){
                return cachedAdmins.find((admin)=>admin.adminId==adminId);
            }

        }
    })
}
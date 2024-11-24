import {useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Bounce, toast } from "react-toastify";
import {useRouter} from "next/navigation";
import { createTicket,
    getOfferById, getTicketsByCandidate, getTicketsByRecruiter,
    updateTicket
} from "@/lib/api";
import {TicketCreationProps, TicketProps, TicketUpdateProps, TicketUpdateQueryProps} from "@/types/tickets";


export function useTicketsByCandidate(candidateId: string) {
    return useQuery<TicketProps[]>({
        queryKey:['ticket-candidate',candidateId],
        queryFn:()=>getTicketsByCandidate(candidateId),
    })
}

export function useTicketsByRecruiter(recruiterId: string) {
    return useQuery<TicketProps[]>({
        queryKey:['ticket-recruiter',recruiterId],
        queryFn:()=>getTicketsByRecruiter(recruiterId),
    })
}



export function useTicket(ticketId: string) {
    return useQuery<TicketProps>({
        queryKey:['ticket',ticketId],
        queryFn:()=>getOfferById(ticketId!),
    })
}


// mutations...................................

export function useCreateTicket(){

    const queryClient=useQueryClient();
    const router=useRouter();

    return useMutation({
        mutationFn:(data:TicketCreationProps)=> createTicket(data),
        onSettled:async (data,error,variables)=>{//what to run after the mutation whether its a sucess or error
            //data : output on sucess
            //error : output on error
            //variables : input data


        },
        onSuccess:()=>{
            toast.success("Ticket created successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
            router.push('/recruiter/tickets');
        },
        onError:(error)=>{
            let msg="Error Occurred!"
            console.log("err msg",msg)
            toast.error( msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
        }
    })
}


export function useUpdateTicketMutation(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(req:TicketUpdateQueryProps)=>updateTicket(req.updateReq),
        onSettled:async (data,error,variables)=> {
            //data : output on sucess
            //error : output on error
            //variables : input data
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({queryKey: ['ticket-candidate',variables.candidateId]})
                await queryClient.invalidateQueries({queryKey: ['ticket-recruiter',variables.recruiterId]})
                await queryClient.invalidateQueries({queryKey: ["ticket", variables.updateReq.ticketId],
                })
            }
        },
        onSuccess:()=>{
            toast.success("Updated successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
        },
        onError:()=>{
            toast.error("Error Occurred!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
        }
    })

}
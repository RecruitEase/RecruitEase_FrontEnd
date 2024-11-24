import {OfferUpdateProps} from "@/types/offers";

export interface TicketProps {
    ticketId:string;
    type:string;
    status:string;
    subject:string;
    description:string;
    creatorId:string;
    creatorRole:string;
    note?:string;
    createdAt: string;
    modifiedAt:string;
}

export interface TicketUpdateProps {
    ticketId:string;
    status?:string;
    note?:string;
}

export interface TicketUpdateQueryProps {
    updateReq: TicketUpdateProps;
    candidateId?: string;
    recruiterId?: string;
}


export interface TicketCreationProps {
    type:string;
    subject:string;
    note:string;
}


export const statusColorMap: Record<string, string> = {
    UNDER_REVIEW: "#fbdba7",
    RESOLVED: "#a2e9c1",
    REJECTED: "#FAA0BF",
};


export const statusOptions = [
    {name: "Resolved", uid: "RESOLVED"},
    {name: "Rejected", uid: "REJECTED"},
    {name: "Under Review", uid: "UNDER_REVIEW"},
];

export const typeOptions = [
    {name: "Job Offer", uid: "JOB_OFFER"},
    {name: "Job Application", uid: "JOB_APPLICATION"},
    {name: "Job Listing", uid: "JOB_LISTING"},
    {name: "Interview", uid: "INTERVIEW"},
    {name: "Payment", uid: "PAYMENT"},
    {name: "Other", uid: "OTHER"},
    {name: "Support", uid: "SUPPORT"},
];

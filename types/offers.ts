import { ApplicationProp } from "./applications";
import {Job} from "@/types/job";
import {CandidateProp, RecruiterProp} from "@/types/users";



export const statusOptions = [
    {name: "Pending", uid: "PENDING"},
    {name: "Accepted", uid: "ACCEPTED"},
    {name: "Rejected", uid: "REJECTED"},
    {name: "Expired", uid: "EXPIRED"},
    {name: "Canceled", uid: "CANCELED"},
];






export const statusColorMap: Record<string, string> = {
    PENDING: "#D7F8FE",
    CANCELED: "#C9A9E9",
    EXPIRED: "#fbdba7",
    ACCEPTED: "#a2e9c1",         // Same color as "Offered"
    REJECTED: "#FAA0BF",
};

export interface OfferProps {
    offerId: string;
    application: ApplicationProp;
    jobId: string;
    candidateId: string;
    recruiterId: string;
    finalAcceptanceDateTime: string;
    startDateTime: string;
    description: string;
    location: string;
    status: string;
    createdAt: string;
    statusChangeNote?: string|null;
}

export interface OfferCreationProps {
    applicationId: string;
    jobId: string;
    candidateId: string;
    recruiterId: string;
    finalAcceptanceDateTime: string;
    startDateTime: string;
    description: string;
    location: string;
}

export interface OfferUpdateProps {
    offerId: string;
    status: string;
    statusChangeNote: string;
}

export interface OfferUpdateQueryProps {
    updateReq: OfferUpdateProps;
    candidateId?: string;
    recruiterId?: string;
}



//for offer tables
export interface JobListTableProps {
    popup: (rowItem:RowProp) => void;
    updateOffer: (rowItem:RowProp) => void;
    jobs:Job [];
    offers:OfferProps[];
    candidates:CandidateProp[];
}
export interface RowProp extends OfferProps {
    candidate:CandidateProp | null;
    job:Job | null;
    name:string | null;
}


//candidate view
export interface OfferPopUpProps{
    offer:OfferProps;
    job:Job;
    recruiter:RecruiterProp;
}
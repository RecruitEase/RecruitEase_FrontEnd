import { ApplicationProp } from "./applications";

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
    applicationId?: string;
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
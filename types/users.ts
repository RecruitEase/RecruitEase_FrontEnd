

export interface RecruiterProp {
    id: string;
    recruiterId: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    companyName: string;
    city: string;
    gender: string;
    businessRegistrationNumber: string;
    address: string;
    website: string | null;
}


export interface CandidateProp {
    id: string;
    candidateId: string;
    email: string;
    role: string;
    isActive: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    city: string;
    gender: string;
    profileStatus: string;
}




export interface ModeratorProp {
    id: string;
    moderatorId: string;
    email: string;
    role: string;
    isActive: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    city: string;
    gender: string;
}



export interface AdminProp {
    id: string;
    adminId: string;
    email: string;
    role: string;
    isActive: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    city: string;
    gender: string;
}

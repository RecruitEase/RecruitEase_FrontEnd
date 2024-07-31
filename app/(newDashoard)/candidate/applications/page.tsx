import React from 'react';
import ApplicationStatusTable from "@/components/applicationStatus/applicationStatusTable";
import HeaderBox from "@/components/dashboard/HeaderBox";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";

type Status = "Submitted" | "Under Review" | "Interview Called" | "Selected" | "Rejected" | "Withdrawn";

interface Applicant {
    id: number;
    position: string;
    date: string;
    status: Status;
    avatar: string;
    companyName: string;
}

const ApplicationStatus = () => {
    const users: Applicant[] = [
        {
            id: 1,
            position: "Community Manager",
            date: "2024/02/01",
            status: "Submitted",
            avatar: "/assets/companyLogos/IFS.jpg",
            companyName: "IFS",
        },
        {
            id: 2,
            position: "Technical Lead",
            date: "2024/02/01",
            status: "Under Review",
            avatar: "/assets/companyLogos/aws.jpeg",
            companyName: "AWS",
        },
        {
            id: 3,
            position: "Senior Developer",
            date: "2024/02/01",
            status: "Under Review",
            avatar: "/assets/companyLogos/Microsoft.jpg",
            companyName: "Microsoft",
        },
        {
            id: 4,
            position: "Community Manager",
            date: "2024/02/01",
            status: "Submitted",
            avatar: "/assets/companyLogos/Salesforce.jpeg",
            companyName: "Salesforce",
        },
        {
            id: 5,
            position: "Sales Manager",
            date: "2024/02/01",
            status: "Interview Called",
            avatar: "/assets/companyLogos/OIP.jpeg",
            companyName: "Oracle",
        },
        {
            id: 6,
            position: "Community Manager",
            date: "2024/02/01",
            status: "Withdrawn",
            avatar: "/assets/companyLogos/Intuit.png",
            companyName: "Intuit",
        },
        {
            id: 7,
            position: "Community Manager",
            date: "2024/02/01",
            status: "Selected",
            avatar: "/assets/companyLogos/VMware.jpeg",
            companyName: "VMware",
        },
        {
            id: 8,
            position: "Community Manager",
            date: "2024/02/01",
            status: "Rejected",
            avatar: "/assets/companyLogos/Infosys.jpeg",
            companyName: "Infosys",
        }
    ];

    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Application Status"
                    subtext="Manage your submitted applications from here"
                />
            </header>
            <ApplicationStatusTable users={users} />
        </div>
    );
}

export default ApplicationStatus;

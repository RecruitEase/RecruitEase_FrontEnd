import React from 'react';
import ApplicationStatusTable from "@/components/applicationStatus/applicationStatusTable";
import HeaderBox from "@/components/dashboard/HeaderBox";

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
            position: "CEO",
            date: "2024/02/01",
            status: "Submitted",
            avatar: "https://ta-relay-public-files-prod.s3.us-east-2.amazonaws.com/icp/product_images/2d01c7d43f337f362c11d7e422263064.jpg",
            companyName: "IFS",
        },
        {
            id: 2,
            position: "Technical Lead",
            date: "2024/02/01",
            status: "Withdrawn",
            avatar: "https://th.bing.com/th/id/OIP.b_al7C5p26tbZG4sy-CWqwAAAA?w=213&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            companyName: "AWS",
        },
        {
            id: 3,
            position: "Senior Developer",
            date: "2024/02/01",
            status: "Rejected",
            avatar: "https://ta-relay-public-files-prod.s3.us-east-2.amazonaws.com/icp/product_images/2d01c7d43f337f362c11d7e422263064.jpg",
            companyName: "IFS",
        },
        {
            id: 4,
            position: "Community Manager",
            date: "2024/02/01",
            status: "Selected",
            avatar: "https://th.bing.com/th/id/OIP.b_al7C5p26tbZG4sy-CWqwAAAA?w=213&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            companyName: "AWS",
        },
        {
            id: 5,
            position: "Sales Manager",
            date: "2024/02/01",
            status: "Interview Called",
            avatar: "https://ta-relay-public-files-prod.s3.us-east-2.amazonaws.com/icp/product_images/2d01c7d43f337f362c11d7e422263064.jpg",
            companyName: "IFS",
        },
        {
            id: 6,
            position: "Community Manager",
            date: "2024/02/01",
            status: "Under Review",
            avatar: "https://th.bing.com/th/id/OIP.b_al7C5p26tbZG4sy-CWqwAAAA?w=213&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            companyName: "AWS",
        }
    ];

    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Application Status"
                    subtext="Manage you submitted applications from here"
                />
            </header>
            <ApplicationStatusTable users={users}/>
        </div>
    );
}

export default ApplicationStatus;

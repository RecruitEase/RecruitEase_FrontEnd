"use client";
import React,{useEffect, useState} from 'react';
import ApplicationStatusTable from "@/components/applicationStatus/ApplicationStatusTable";
import HeaderBox from "@/components/dashboard/HeaderBox";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import { ApplicationProp, JobProps, RecruiterProp } from '@/types';
import axios from 'axios';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import content from '../../../../components/admin/content';
import ApplicationStatusTableNew from '@/components/applicationStatus/ApplicationStatusTableNew';
import ApplicationStatusTableFinal from '@/components/applicationStatus/ApplicationStatusTableFinal';



const ApplicationStatus = () => {
    const axios=useAxiosAuth();
    const { data: session } = useSession();
    const candidateId=session?.user.roleDetails.candidateId;


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [applications, setApplications] = useState<ApplicationProp[]>([]);
    const [jobs, setJobs] = useState<JobProps[]>([]);
    const [recruiters, setRecruiters] = useState<RecruiterProp[]>([]);




useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch application data API call
            const applicationResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/candidate/${candidateId}`)
            const applicationList:ApplicationProp[]=applicationResponse.data.content;
            setApplications(applicationList);
            console.log("applications",applicationList)

            // Extract recruiterIds and get unique ids
            const recruiterIdList:string[] = [];

            applicationList.map(app => {
                if (recruiterIdList.indexOf(app.recruiterId) === -1) {
                    recruiterIdList.push(app.recruiterId)
                }
            });

            console.log("recIds",recruiterIdList)

            // recruiter details API call using data from the first call
            const recruiterResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/detail-list`,{recruiterIdList});
            console.log("reecruiters",recruiterResponse.data)
            setRecruiters(recruiterResponse.data.content.recruiterList);
            
            //todo: job fetch
            //get job details for
            // const jobIdList=applicationList.map(app=>app.jobId);
            // const jobResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/`,{jobIdList});
            // console.log("jobs",jobResponse.data)
            // setJobs(jobResponse.data.content);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []); // Empty dependency array ensures this effect runs only once on mount

// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error}</p>;

    // const users: Applicant[] = [
    //     {
    //         id: 1,
    //         position: "Community Manager",
    //         date: "2024/02/01",
    //         status: "Submitted",
    //         avatar: "/assets/companyLogos/IFS.jpg",
    //         companyName: "IFS",
    //     },
    //     {
    //         id: 2,
    //         position: "Technical Lead",
    //         date: "2024/02/01",
    //         status: "Under Review",
    //         avatar: "/assets/companyLogos/aws.jpeg",
    //         companyName: "AWS",
    //     },
    //     {
    //         id: 3,
    //         position: "Senior Developer",
    //         date: "2024/02/01",
    //         status: "Under Review",
    //         avatar: "/assets/companyLogos/Microsoft.jpg",
    //         companyName: "Microsoft",
    //     },
    //     {
    //         id: 4,
    //         position: "Community Manager",
    //         date: "2024/02/01",
    //         status: "Submitted",
    //         avatar: "/assets/companyLogos/Salesforce.jpeg",
    //         companyName: "Salesforce",
    //     },
    //     {
    //         id: 5,
    //         position: "Sales Manager",
    //         date: "2024/02/01",
    //         status: "Interview Called",
    //         avatar: "/assets/companyLogos/OIP.jpeg",
    //         companyName: "Oracle",
    //     },
    //     {
    //         id: 6,
    //         position: "Community Manager",
    //         date: "2024/02/01",
    //         status: "Withdrawn",
    //         avatar: "/assets/companyLogos/Intuit.png",
    //         companyName: "Intuit",
    //     },
    //     {
    //         id: 7,
    //         position: "Community Manager",
    //         date: "2024/02/01",
    //         status: "Selected",
    //         avatar: "/assets/companyLogos/VMware.jpeg",
    //         companyName: "VMware",
    //     },
    //     {
    //         id: 8,
    //         position: "Community Manager",
    //         date: "2024/02/01",
    //         status: "Rejected",
    //         avatar: "/assets/companyLogos/Infosys.jpeg",
    //         companyName: "Infosys",
    //     }
    // ];

    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Application Status"
                    subtext="Manage your submitted applications from here"
                />
            </header>
            {loading && <p>Loading...</p>}
            {!loading && error &&  <p>Error: {error}</p>}
            {!loading && !error &&   <ApplicationStatusTableFinal applications={applications} jobs={jobs} recruiters={recruiters} />}
           
        </div>
    );
}

export default ApplicationStatus;

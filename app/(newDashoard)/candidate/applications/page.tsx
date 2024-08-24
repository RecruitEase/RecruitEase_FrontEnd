"use client";
import React,{ useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import { JobProps } from '@/types';
import { useSession } from 'next-auth/react';
import ApplicationStatusTableFinal from '@/components/applicationStatus/ApplicationStatusTableFinal';
import {useApplications} from "@/lib/hooks/useApplications";
import { useRecruiters } from '@/lib/hooks/useRecruiters';



const ApplicationStatus = () => {
    const { data: session } = useSession();
    const candidateId=session?.user.roleDetails.candidateId;



    const [jobs, setJobs] = useState<JobProps[]>([]);



    const applicationsQuery=useApplications(candidateId);
    console.log("applicationsQuery",applicationsQuery.data)



    // Extract recruiterIds and get unique ids
    const recruiterIdList:string[] = [];

    applicationsQuery.data?.map(app => {
        if (recruiterIdList.indexOf(app.recruiterId) === -1) {
            recruiterIdList.push(app.recruiterId)
        }
    });

    console.log("recIdsFromuseQuery",recruiterIdList)

    const recruitersQuery=useRecruiters(recruiterIdList);
    console.log("recruiterssQuery",recruitersQuery.data)

    //todo: job fetch
    //get job details for applications


    if(applicationsQuery.isPending || recruitersQuery.isPending){
        return <span>Loading data....</span>
    }

    if(applicationsQuery.isError || recruitersQuery.isError){
        return <span>Error fetching data</span>
    }

    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Application Status"
                    subtext="Manage your submitted applications from here"
                />
            </header>
  <ApplicationStatusTableFinal applications={applicationsQuery.data!} jobs={jobs} recruiters={recruitersQuery.data!} />
           
        </div>
    );
}

export default ApplicationStatus;

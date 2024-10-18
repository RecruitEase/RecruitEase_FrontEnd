"use client";
import React,{ useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import { JobProps } from '@/types';
import { useSession } from 'next-auth/react';
import ApplicationStatusTableFinal from '@/components/applicationStatus/ApplicationStatusTableFinal';
import {useApplication, useApplications} from "@/lib/hooks/useApplications";
import { useRecruiters } from '@/lib/hooks/useRecruiters';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import {useJobs} from "@/lib/hooks/useJobs";



const ApplicationStatus = () => {
    const { data: session } = useSession();
    const candidateId=session?.user.roleDetails.candidateId;

    const [jobs, setJobs] = useState<JobProps[]>([]);

    const applicationsQuery=useApplications(candidateId);
    console.log("applicationsQuery",applicationsQuery.data)



    // Extract recruiterIds and get unique ids
    const recruiterIdList:string[] = [];
    const jobIdList:string[] = [];

    applicationsQuery.data?.map(app => {
        jobIdList.push(app.jobId)
        if (recruiterIdList.indexOf(app.recruiterId) === -1) {
            recruiterIdList.push(app.recruiterId)
        }
    });

    console.log("recIdsFromuseQuery",recruiterIdList)
    console.log("jobIdsFromuseQuery",jobIdList)

    const recruitersQuery=useRecruiters(recruiterIdList);
    console.log("recruiterssQuery",recruitersQuery.data)

    const jobsQuery=useJobs(jobIdList)

    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Application Status"
                    subtext="Manage your submitted applications from here"
                />
            </header>
            {
            (applicationsQuery.isFetching || recruitersQuery.isFetching || jobsQuery.some(query => query.isFetching))?
            <LoadingComponent />
            :(applicationsQuery.isSuccess && applicationsQuery.data.length==0)?
            <div className="flex justify-center items-center h-96">
                No applications found
                </div>
            :(applicationsQuery.isError || recruitersQuery.isError || jobsQuery.some(query => query.isError))?
            < ErrorComponent />
            :
             <ApplicationStatusTableFinal applications={applicationsQuery.data!} jobs={jobsQuery} recruiters={recruitersQuery.data!} />

            }
           
        </div>
    );
}

export default ApplicationStatus;

"use client";
import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import JobOfferForm from "@/components/sendJobOffer/jobOfferForm";
import {useParams} from "next/navigation";
import {useApplication} from "@/lib/hooks/useApplications";
import {useCandidate} from "@/lib/hooks/useCandidates";
import {useJob} from "@/lib/hooks/useJobs";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";

const sendJobOffer = () =>{
    const params = useParams<{ id: string }>()//application id

    const useApplicationQuery=useApplication(params.id)
    const useCandidateQuery=useCandidate(useApplicationQuery.data?.candidateId)
    const useJobQuery=useJob(useApplicationQuery.data?.jobId)
    return(
        <div>
            <header className="home-header">
                <HeaderBox type="title" title="Create Job Offer" subtext=" Fill out the form below to create a new job offer."/>
            </header>
            {
                (useApplicationQuery.isFetching || useCandidateQuery.isFetching || useJobQuery.isFetching) ?
                    <LoadingComponent/>
                    : (useApplicationQuery.isError || useCandidateQuery.isError || useJobQuery.isError) ?
                        < ErrorComponent/>
                        :
            <JobOfferForm job={useJobQuery.data!} candidate={useCandidateQuery.data!} application={useApplicationQuery.data!} />
            }
        </div>
    )
}

export default sendJobOffer;
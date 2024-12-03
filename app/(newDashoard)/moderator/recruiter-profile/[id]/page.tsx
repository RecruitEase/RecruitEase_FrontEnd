"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/recruiterProfile/ProfileCard";
import RecruiterJobs from "@/components/recruiterProfile/RecruiterJobs";
import { useParams } from "next/navigation";
import { getJobsByRecruiterId, getRecruiter } from "@/lib/api";
import { JobProps } from "@/types";
import { set } from "react-hook-form";
import { RecruiterProp } from "@/types/users";

export default function Page() {
    const [jobs, setJobs] = useState<JobProps[]>([]);
    const [recruiterDetails, setRecruiterDetails] = useState<RecruiterProp>();

    const params = useParams();
    const recruiterId: string = (params?.id as string);

    useEffect(()=>{
        try{
            const jobRes = getJobsByRecruiterId(recruiterId);
            jobRes.then((data)=>{setJobs(data)});

            const recruiterRes = getRecruiter(recruiterId);
            recruiterRes.then((data)=>{setRecruiterDetails(data)});

        }
        catch(error){
            console.error("Error fetching jobs:", error);
        }
    }, [recruiterId])

    useEffect(()=>{
        console.log("jobs",jobs);
        console.log("recDetails",recruiterDetails);
    })

    return (
        <div className="min-h-screen flex flex-col xl:flex-row xl:justify-center">
            {/* Main Section */}

            <div className="bg-white flex flex-col w-full xl:w-2/3 ">
                {recruiterDetails && <RecruiterJobs jobs={jobs} companyName={recruiterDetails.companyName} companyImg={recruiterDetails.profilePic}/>}
            </div>

            {/* Left Section */}
            <div className="bg-white flex flex-col w-full xl:w-1/3 mt-4 xl:mt-0 xl:ml-4">
                {recruiterDetails && <ProfileCard data={recruiterDetails} />}
            </div>
        </div>
    );
}
